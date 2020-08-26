package images

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
)

func GetImages(w http.ResponseWriter, r *http.Request) {
	// enableCors(&w)

	fmt.Println("get images endpoint hit")

	files, err := ioutil.ReadDir("./temp-images")
	if err != nil {
		log.Fatal(err)
	}

	var fileNames []string
	for _, file := range files {
		fileNames = append(fileNames, file.Name())
	}

	json.NewEncoder(w).Encode(fileNames)
}
