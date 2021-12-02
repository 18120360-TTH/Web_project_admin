customFile.onchange = evt => {
    const [file] = customFile.files
    if (file) {
        let label = document.getElementById("customFile-label")
        label.innerHTML = file.name
    }
}