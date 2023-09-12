<<<<<<< HEAD
        const mermaidd = document.getElementById("mermaid")
        const karang = document.getElementById("karang")
        const playerScore = document.getElementById("score")

        let score = 0
        let interval = null

        let jumlahScore = () => {
            score++;
            playerScore.innerHTML = `Score : ${score}`
        };


        function jump() {
            if(mermaidd.classList != "animate"){    
                mermaidd.classList.add("animate")
            }
            setTimeout(function(){
                mermaidd.classList.remove("animate")
            },500)
            let score = 0
            interval = setInterval(jumlahScore, 100)

        }

        const ifhitkarang = setInterval(function(){
            const mermaidTop = parseInt(window.getComputedStyle(mermaidd).getPropertyValue("top"))
            const karangLeft = parseInt(window.getComputedStyle(karang).getPropertyValue("left"))

            if(karangLeft < 70 && karangLeft > 0 && mermaidTop >= 60){
                karang.style.animation = "none"
                karang.style.display = "none"
                if(confirm("Mermaid kamu nabrak karang, ingin ulang?")){
                    window.location.reload()
                }
            }
=======
        const mermaidd = document.getElementById("mermaid")
        const karang = document.getElementById("karang")
        const playerScore = document.getElementById("score")

        let score = 0
        let interval = null

        let jumlahScore = () => {
            score++;
            playerScore.innerHTML = `Score : ${score}`
        };


        function jump() {
            if(mermaidd.classList != "animate"){    
                mermaidd.classList.add("animate")
            }
            setTimeout(function(){
                mermaidd.classList.remove("animate")
            },500)
            let score = 0
            interval = setInterval(jumlahScore, 100)

        }

        const ifhitkarang = setInterval(function(){
            const mermaidTop = parseInt(window.getComputedStyle(mermaidd).getPropertyValue("top"))
            const karangLeft = parseInt(window.getComputedStyle(karang).getPropertyValue("left"))

            if(karangLeft < 70 && karangLeft > 0 && mermaidTop >= 60){
                karang.style.animation = "none"
                karang.style.display = "none"
                if(confirm("Mermaid kamu nabrak karang, ingin ulang?")){
                    window.location.reload()
                }
            }
>>>>>>> 285d17b85c951296e3773531466df99650460303
        })