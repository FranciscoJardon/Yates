const firebaseConfig = {
    apiKey: "AIzaSyBoU6bR_WVh2oEzzF61TFw2CruSF56FUFc",
    authDomain: "rentayachtloscabos.firebaseapp.com",
    projectId: "rentayachtloscabos",
    storageBucket: "rentayachtloscabos.appspot.com",
    messagingSenderId: "351198330910",
    appId: "1:351198330910:web:8c7fce1da62cad2fa4ae0f",
  };
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const storage = firebase.storage();

  


  TraerContenidoYate();

  async function TraerContenidoYate() {
      const MostrarFotosYate = document.getElementById("MostrarFotosYate");
      const MiniImagenes = document.getElementById("MiniImagenes");
      var queryString = window.location.search;
      queryString = queryString.substring(1);
      queryString = queryString.replace(/-/g, " ");
      console.log(queryString);
  
      try {
          const doc = await db.collection("Yates").doc(queryString).get();
          const data = doc.data();
          const promises = [];
  
          data.FotosYate.forEach((fotoUrl) => {
              const imgElement = document.createElement("img");
              imgElement.src = fotoUrl;
  
              // Crear contenedor para la imagen en MostrarFotosYate
              const imgContainer1 = document.createElement("div");
              imgContainer1.className = "swiper-slide ImgPortada";
              imgContainer1.appendChild(imgElement);
              MostrarFotosYate.querySelector('.swiper-wrapper').appendChild(imgContainer1);
  
              // Crear contenedor para la imagen en MiniImagenes
              const imgContainer2 = document.createElement("div");
              imgContainer2.className = "swiper-slide ImgPortada";
              imgContainer2.appendChild(imgElement.cloneNode(true));
              MiniImagenes.querySelector('.swiper-wrapper').appendChild(imgContainer2);
  
              // Agregar promesa para cada imagen creada
              promises.push(new Promise((resolve) => {
                  imgElement.onload = resolve;
                  imgElement.onerror = resolve; // En caso de error, también resolvemos
              }));
          });
  
          // Esperar a que todas las imágenes estén cargadas
          await Promise.all(promises);
  
          // Ahora que todas las imágenes están cargadas, puedes mostrar los sliders
          // Código para mostrar los sliders
      } catch (error) {
          console.log("Error obteniendo documento:", error);
      }
  }
  