# Build a Simple REST API with Koa
## Introduction

This project is to try to build a simple REST API with Koa for an order backend syetem.

## Pre-reqs
* Docker
* Your own Google Maps API Key

## Features
* Koa2
* Docker-compose

## Included middleware
* koa-joi-router: router and data validataion
* koa-bodyparser: parse the request body and params

## Getting Started
* Clone the repository
* Go to `server/config/index.js` to add your own google maps api key in the config file.
	```
 	{ GCP_API_KEY: YOUR_OWN_KEY }
 	```
* In the root of the project, run `sh start.sh`.
* Run the command in the terminal below. If it returns will data, it means it's OK now.
	```
 	curl --request get http://127.0.0.1:8080/orders?page=1&limit=10
    ```
* To stop the service, please run `sh stop.sh` in the root of the project.

## Endpoints
#### Place order
  - Method: `POST`
  - URL path: `/orders`
  - Request body:
    ```
    {
        "origin": ["START_LATITUDE", "START_LONGTITUDE"],
        "destination": ["END_LATITUDE", "END_LONGTITUDE"]
    }
    ```

#### Take order
  - Method: `PATCH`
  - URL path: `/orders/:id`
  - Request body:
    ```
    {
        "status": "TAKEN"
    }
    ```

#### Order list
  - Method: `GET`
  - Url path: `/orders?page=:page&limit=:limit`