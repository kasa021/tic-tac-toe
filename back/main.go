package main

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	// "net/http"

	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

type Handler struct {
	DB *sql.DB
}

type PostGames struct {
	GameId   int    `db:"game_id" json:"game_id"`
	GameName string `db:"game_name" json:"game_name"`
}

type PostMoves struct {
	MoveId     int    `db:"move_id" json:"move_id"`
	GameId     int    `db:"game_id" json:"game_id"`
	MoveNumber int    `db:"move_number" json:"move_number"`
	BoardState string `db:"board_state" json:"board_state"`
}

func main() {
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
	db, err := sql.Open("postgres", connectionString)
	if err != nil {
		log.Fatal(err)
	}

	// 要素を取ってっくる
	rows, err := db.Query("SELECT * FROM games")
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(rows)
	moves, err := db.Query("SELECT * FROM moves")
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("%#+v\n", moves)

	defer db.Close()
}
