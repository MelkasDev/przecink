document.addEventListener("DOMContentLoaded", function () {
    let niepo = document.getElementById("niepo");
    let popr = document.getElementById("popr");
    let niepo2 = document.getElementById("user");
    let script = document.getElementById("script");
    let wyja = document.getElementById("wyja");
    let lol = document.getElementById("lol");
    let xd = document.getElementById("xd");
    let currentSentence = {};
    let i = 0;
    
    function loadSentence() {
        i = 0;
        niepo.style.display = "block";
        popr.style.display = "block";
        niepo2.style.display = "none";
        script.style.display = "none";
        wyja.style.display = "none";
        xd.style.display = "none";
        lol.style.display = "none";
        popr.focus();

        
        fetch("zdania.json")
            .then(response => response.json())
            .then(data => {
                currentSentence = data[Math.floor(Math.random() * data.length)];
                niepo.textContent = currentSentence.zdanie_blad;
            })
            .catch(error => console.error("Błąd wczytywania pliku JSON:", error));
    }

    function normalizeText(text) {
        return text.trim().replace(/\s+/g, " ").replace(/\./g, "").toLowerCase();
    }
    
    popr.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            let userInput = normalizeText(popr.value);
            let correctSentence = normalizeText(currentSentence.zdanie_poprawne);
            
            if (userInput === correctSentence) {    
                xd.style.display = "block";       
                niepo.style.display = "none";
                lol.style.display = "block";
                popr.style.display = "none";
                niepo2.style.display = "block";
                wyja.style.display = "block";
                script.style.display = "block";
                xd.textContent = " Poprawnie odpowiedziałeś!";
                wyja.innerHTML = currentSentence.wyjasnienie + "<a class='neon-button2' href='slownik.html'>Sprawdź dlaczego</a>";
                script.innerHTML = "<p class='neon-button2'>Prawidłowe zdanie to: </p> <br> " + currentSentence.zdanie_poprawne;
                niepo2.innerHTML = "<p class='neon-button2'> Napisałeś </p>  <br>" + popr.value;
                addEventListener("keydown", function (event) {
                if (event.key === "Shift") {
                    popr.value = "";
                    loadSentence();
                }})
                
            } else {
                i++;
                if (i >= 3) {
                    xd.style.display = "block";
                    lol.style.display = "block";
                    niepo.style.display = "none";
                    popr.style.display = "none";
                    niepo2.style.display = "block";
                    wyja.style.display = "block";
                    script.style.display = "block";
                    xd.innerHTML = " Źle odpowiedziałeś!";
                    wyja.innerHTML = currentSentence.wyjasnienie + "<a class='neon-button2' href='slownik.html'>Sprawdź dlaczego</a>";
                    script.innerHTML = "<p class='neon-button2'>Prawidłowe zdanie to: </p> <br> " + currentSentence.zdanie_poprawne;
                    niepo2.innerHTML = "<p class='neon-button2'> Napisałeś </p>  <br>" + popr.value;
                    addEventListener("keydown", function (event) {
                    if (event.key === "Shift") {
                        popr.value = "";
                        loadSentence();
                    }})
                }
                alert("Spróbuj ponownie!");
            }
        }
    });

    loadSentence();
});
