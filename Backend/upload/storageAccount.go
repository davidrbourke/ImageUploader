package upload

import (
	"fmt"
	"log"
	"net/url"
	"os"

	"github.com/Azure/azure-storage-blob-go/azblob"
	"github.com/davidrbourke/ImageUploader/Backend/utils"
	"golang.org/x/net/context"
)

// func randomString() string {
// 	r := rand.New(rand.NewSource(time.Now().UnixNano()))
// 	return strconv.Itoa(r.Int())
// }

func handleErrors(err error) {
	if err != nil {
		if serr, ok := err.(azblob.StorageError); ok { // This error is a Service-specific
			switch serr.ServiceCode() { // Compare serviceCode to ServiceCodeXxx constants
			case azblob.ServiceCodeContainerAlreadyExists:
				fmt.Println("Received 409. Container already exists")
				return
			}
		}
		log.Fatal(err)
	}
}

// ToStorageAccount sends an image file to the azure storage account
func ToStorageAccount(uploadFilename string) {

	accountName, err := utils.GetStorageAccountName()
	if err != nil {
		panic(err)
	}

	accountKey, err := utils.GetStorageAccountKey()
	if err != nil {
		panic(err)
	}

	credential, err := azblob.NewSharedKeyCredential(accountName, accountKey)
	if err != nil {
		log.Fatal("Error creating credential")
	}

	p := azblob.NewPipeline(credential, azblob.PipelineOptions{})

	containerName := "qs-image"

	URL, _ := url.Parse(
		fmt.Sprintf("https://%s.blob.core.windows.net/%s", accountName, containerName))

	containerURL := azblob.NewContainerURL(*URL, p)
	ctx := context.Background()
	_, err = containerURL.Create(ctx, azblob.Metadata{}, azblob.PublicAccessNone)
	handleErrors(err)

	blobURL := containerURL.NewBlockBlobURL(uploadFilename)
	file, err := os.Open(uploadFilename)
	handleErrors(err)

	_, err = azblob.UploadFileToBlockBlob(ctx, file, blobURL, azblob.UploadToBlockBlobOptions{
		BlockSize:   4 * 1024 * 1024,
		Parallelism: 16})
	handleErrors(err)

	err = file.Close()
	if err != nil {
		log.Fatal(err)
	}

	err = os.Remove(uploadFilename)
	if err != nil {
		log.Fatal(err)
	}
}