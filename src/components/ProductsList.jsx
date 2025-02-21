import { useState, useEffect } from 'react';
import axios from 'axios';

// const mediterraneanFruits = [
//     {
//         id: 1,
//         titolo: "Arance",
//         autore: "Autore 1",
//         contenuto: "Ricche di vitamina C.",
//         categoria: "Agrumi"
//     },
//     {
//         id: 2,
//         titolo: "Limoni",
//         autore: "Autore 2",
//         contenuto: "Ottimi per il succo.",
//         categoria: "Agrumi"
//     },
//     {
//         id: 3,
//         titolo: "Mandarini",
//         autore: "Autore 3",
//         contenuto: "Dolci e succosi.",
//         categoria: "Agrumi"
//     },
//     {
//         id: 4,
//         titolo: "Fichi",
//         autore: "Autore 4",
//         contenuto: "Deliziosi freschi o secchi.",
//         categoria: "Frutta"
//     },
//     {
//         id: 5,
//         titolo: "Albicocche",
//         autore: "Autore 5",
//         contenuto: "Perfette per le marmellate.",
//         categoria: "Frutta"
//     },
//     {
//         id: 6,
//         titolo: "Pesche",
//         autore: "Autore 6",
//         contenuto: "Succhino rinfrescante.",
//         categoria: "Frutta"
//     }
// ];



const initialFormData = {
    title: "",
    content: "",
    image: "",
    tags: []
}



export default function FruitsList() {

    // State dei Post

    const [fruitPosts, setFruitPosts] = useState([])



    // State del Form

    const [formData, setFormData] = useState(initialFormData)



    // Funzione API

    function fetchPosts() {

        axios.get("http://localhost:3000/route")

            .then((res) =>

                setFruitPosts(res.data)

            )
            .catch(function (error) {

                console.log(error);

            })

    }



    // Caricamento ad inizio pagina

    useEffect(fetchPosts, [])



    // Funzione del contenuto del Form

    function handleFormData(e) {

        const value = e.target.name === "tags" ? e.target.value.split(",") : e.target.value;

        setFormData((currentFormData) => ({
            ...currentFormData,
            [e.target.name]: value
        }))

    }



    // Funzione del Submit

    function handleSubmit(e) {

        e.preventDefault();

        axios.post("http://localhost:3000/route", formData)

            .then(res => {
                console.log(res.data)
            })

        setFruitPosts((currentFruitsPosts) => [...currentFruitsPosts,
        {
            id:
                currentFruitsPosts.length === 0 ? 1 : currentFruitsPosts[currentFruitsPosts.length - 1].id + 1,
            ...formData
        }])

        setFormData(initialFormData)
    }




    // Funzione del bottone di rimozione post

    function removePost(id) {

        const updatedPosts = fruitPosts.filter((post) => {
            return post.id !== id;
        });

        axios.delete(`http://localhost:3000/route/${id}`)
            .then(res =>
                console.log(res),
                setFruitPosts(updatedPosts)
            )
            .catch(err => console.log(err))
    }



    return (

        <>

            {/* Form */}

            <h3>Form section</h3>

            <button onClick={fetchPosts}>Carica Pizza</button>

            <form className="posts-form" onSubmit={handleSubmit}>

                {/* Titolo */}

                <input
                    type="text"
                    name="title"
                    onChange={handleFormData}
                    value={formData.title}
                    placeholder='Nome del post'
                />


                {/* Contenuto */}

                <textarea
                    type="text"
                    name="content"
                    onChange={handleFormData}
                    value={formData.content}
                    placeholder='Contenuto del post'
                >

                    {/* DEBUG per ricordarmi che text area ha bisogno
                    di un tag di chiusura,
                    con Maracas incluse 🪇 */}

                </textarea>


                {/* Immagine */}

                <input
                    type="text"
                    name="image"
                    onChange={handleFormData}
                    value={formData.image}
                    placeholder='Imagine pizza'
                />


                {/* Categoria */}

                <input
                    type="text"
                    name="tags"
                    onChange={handleFormData}
                    value={formData.tags}
                    placeholder='Categoria del post'
                />


                {/* Bottone del form  */}

                <button>Aggiungi</button>

            </form>


            <h1>React blog</h1>

            {/* Lista post */}

            <ul className="fruit-posts">

                {
                    fruitPosts.map((fruit) => (

                        <li key={fruit.id}>

                            {/* API Properties */}

                            <h2>{fruit.title}</h2>
                            <p>{fruit.content}</p>
                            <img src={fruit.image} />
                            <p>{fruit.tags ? fruit.tags.join(", ") : "No tags available"}</p>

                            {/* <h2>{fruit.titolo}</h2>
                            <h3>{fruit.autore}</h3>
                            <p>{fruit.contenuto}</p>
                            <span>{fruit.categoria}</span> */}


                            {/* Bottone di rimozione del post */}

                            <button className="remove-button" onClick={() => removePost(fruit.id)}>
                                Elimina Post
                            </button>

                        </li>
                    ))
                }

            </ul>

        </>
    )

}