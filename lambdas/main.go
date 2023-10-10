package main

import (
	"encoding/json"
	"net/http"
	"strings"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

type App struct {
	id string
}


func newApp (id string ) *App {
	return &App{
		id:id,
	}
}

func (app *App) Handler (request events.APIGatewayProxyRequest)(events.APIGatewayProxyResponse,error)  {
	responseBody := map[string]string {
		"message":"Hi you have hit this route",
	}

		responseJSON, err := json.Marshal(responseBody)
		if err != nil{
			return events.APIGatewayProxyResponse{
				StatusCode: http.StatusInternalServerError,
				Headers: map[string]string{"Content-Type":"application/json"
				Body:`{"error":"internal server error "}`,
			}
			},nil
	}
	response := events.APIGatewayProxyResponse{
		Body:strings(responseJSON)
	}
	return nil
}


func main(){
	id := "some random string"
	app := newApp(id) 
	// pass in the handlers
	lambda.Start(app.Handler)
}
