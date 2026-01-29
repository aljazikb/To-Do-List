document.getElementById("input").addEventListener("change",function(){
    console.log("clicked")

    const file = this.files[0]
    const reader=new FileReader()

    reader.onload =  function(){
        const base64Image = reader.result;

        document.getElementById("image").src=base64Image 
        localStorage.setItem("image",base64Image )

    };
     reader.readAsDataURL(file); // converts image to Base64


})


window.addEventListener("load",function(){
    const storedImage = localStorage.getItem("image")
    if (storedImage) {
        document.getElementById("image").src = storedImage;
    }
});

