import { useState } from 'react';

const mediterraneanFruits = [
    {
        id: 1,
        titolo: "Arance",
        autore: "Autore 1",
        contenuto: "Ricche di vitamina C.",
        categoria: "Agrumi"
    },
    {
        id: 2,
        titolo: "Limoni",
        autore: "Autore 2",
        contenuto: "Ottimi per il succo.",
        categoria: "Agrumi"
    },
    {
        id: 3,
        titolo: "Mandarini",
        autore: "Autore 3",
        contenuto: "Dolci e succosi.",
        categoria: "Agrumi"
    },
    {
        id: 4,
        titolo: "Fichi",
        autore: "Autore 4",
        contenuto: "Deliziosi freschi o secchi.",
        categoria: "Frutta"
    },
    {
        id: 5,
        titolo: "Albicocche",
        autore: "Autore 5",
        contenuto: "Perfette per le marmellate.",
        categoria: "Frutta"
    },
    {
        id: 6,
        titolo: "Pesche",
        autore: "Autore 6",
        contenuto: "Succhino rinfrescante.",
        categoria: "Frutta"
    }
];



const initialFormData = {
    titolo: "",
    autore: "",
    contenuto: "",
    categoria: ""
}



export default function FruitsList() {

    // State dei Post

    const [fruitPosts, setFruitPosts] = useState(mediterraneanFruits)



    // State del Form

    const [formData, setFormData] = useState(initialFormData)



    // Funzione del contenuto del Form

    function handleFormData(e) {

        setFormData((currentFormData) => ({
            ...currentFormData,
            [e.target.name]: e.target.value
        }))

    }



    // Funzione del Submit

    function handleSubmit(e) {

        e.preventDefault();
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

        setFruitPosts(updatedPosts);

    }



    return (

        <>

            {/* Form */}

            <h3>Form section</h3>

            <form className="posts-form" onSubmit={handleSubmit}>

                {/* Titolo */}

                <input
                    type="text"
                    name="titolo"
                    onChange={handleFormData}
                    value={formData.titolo}
                    placeholder='Nome del post'
                />


                {/* Autore */}

                <input
                    type="text"
                    name="autore"
                    onChange={handleFormData}
                    value={formData.autore}
                    placeholder='Nome Autore'
                />


                {/* Contenuto */}

                <textarea
                    type="text"
                    name="contenuto"
                    onChange={handleFormData}
                    value={formData.contenuto}
                    placeholder='Contenuto del post'
                >

                    {/* DEBUG per ricordarmi che text area ha bisogno
                    di un tag di chiusura,
                    con Maracas incluse 🪇 */}

                </textarea>


                {/* Categoria */}

                <input
                    type="text"
                    name="categoria"
                    onChange={handleFormData}
                    value={formData.categoria}
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

                            <h2>{fruit.titolo}</h2>
                            <h3>{fruit.autore}</h3>
                            <p>{fruit.contenuto}</p>
                            <span>{fruit.categoria}</span>


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