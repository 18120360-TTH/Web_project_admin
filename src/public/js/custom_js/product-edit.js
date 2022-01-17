// const ProductServices = require("../../../app/controllers/ProductServices")
// const authors = require("../../../app/models/authors")

// Upload images preview
formFileSm1.onchange = evt => {
    const [file] = formFileSm1.files
    if (file) {
        img_01.src = URL.createObjectURL(file)
    }
}
formFileSm2.onchange = evt => {
    const [file] = formFileSm2.files
    if (file) {
        img_02.src = URL.createObjectURL(file)
    }
}
formFileSm3.onchange = evt => {
    const [file] = formFileSm3.files
    if (file) {
        img_03.src = URL.createObjectURL(file)
    }
}
formFileSm4.onchange = evt => {
    const [file] = formFileSm4.files
    if (file) {
        img_04.src = URL.createObjectURL(file)
    }
}
