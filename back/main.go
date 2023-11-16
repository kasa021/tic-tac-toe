package main

import (
	"fmt"
	"log"
	"os"

	// "net/http"

	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
)

type Handler struct {
	DB *sqlx.DB
	Logger echo.Logger
}

type PostGames struct {
	GameId int `db:"game_id" json:"game_id"`
	GameName string `db:"game_name" json:"game_name"`
	CreatedAt string `db:"created_at" json:"created_at"`
}

type PostMoves struct {
	GameId int `db:"game_id" json:"game_id"`
	MoveNumber int `db:"move_number" json:"move_number"`
	BoardState string `db:"board_state" json:"board_state"`
}

func connectDB() *sqlx.DB {
	err := godotenv.Load("../.env")
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	dbUser := os.Getenv("POSTGRES_USER")
	dbPassword := os.Getenv("POSTGRES_PASSWORD")
	dbName := os.Getenv("POSTGRES_DB")
	dbHost := "localhost"
	dbPort := "5432"

	var connectionString string = fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable", dbHost, dbPort, dbUser, dbPassword, dbName)
	db, err := sqlx.Connect("postgres", connectionString)
	if err != nil {
		log.Fatalln(err)
	}
	return db
}

func (h *Handler) postGames(c echo.Context) error {
	g := new(PostGames) 
	if err := c.Bind(g); err != nil {
		return err
	}
	if err := h.DB.QueryRowx("INSERT INTO games (game_name) VALUES ($1) RETURNING game_id, game_name, created_at", g.GameName).StructScan(g); err != nil {
		return err
	}
	return c.JSON(200, g)
}

func (h *Handler) postMoves(c echo.Context) error {
	m := new(PostMoves) 
	if err := c.Bind(m); err != nil {
		return err
	}
	if err := h.DB.QueryRowx("INSERT INTO moves (game_id, move_number, board_state) VALUES ($1, $2, $3) RETURNING game_id, move_number, board_state", m.GameId, m.MoveNumber, m.BoardState).StructScan(m); err != nil {
		return err
	}
	return c.JSON(200, m)
}

// getGames
func (h *Handler) getGames(c echo.Context) error {
	var games []PostGames
	if err := h.DB.Select(&games, "SELECT * FROM games"); err != nil {
		return err
	}
	return c.JSON(200, games)
}

// getMoves game_idが一致するmovesを取得
func (h *Handler) getMoves(c echo.Context) error {
	var moves []PostMoves
	if err := h.DB.Select(&moves, "SELECT * FROM moves WHERE game_id = $1", c.Param("game_id")); err != nil {
		return err
	}
	return c.JSON(200, moves)
}

func main() {
	e := echo.New()
	e.Debug = true
	db := connectDB()
	defer db.Close()
	h := &Handler{DB: db, Logger: e.Logger}
	api := e.Group("/api")
	api.POST("/posts/games", h.postGames)
	api.POST("/posts/moves", h.postMoves)
	api.GET("/get/games", h.getGames)
	api.GET("/get/moves/:game_id", h.getMoves)

	e.Logger.Fatal(e.Start(":8080"))
}