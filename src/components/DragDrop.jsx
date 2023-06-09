import React, { useEffect } from "react";
import { useState, useRef } from "react";
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "./drag.css"

const DragDrop = () => {
    const form = useRef();
    const inputRef = useRef()
    const [files, setFiles] = useState(null);
    const [loading, setLoading] = useState(false);
    const [class2, setClass2] = useState("drag__area");
    const [files2, setFiles2] = useState();
    

    const handleDragOver = (event) => {
        event.preventDefault();
        setClass2("drag__area__active");
    }
    const handleDragLeave = (event) =>{
        event.preventDefault();
        setClass2("drag__area");
    }
    const handleDrop = (event) =>{
        event.preventDefault();
        const files = event.dataTransfer.files;
        setFiles(files)
        setClass2("drag__area");
        inputRef.current.files = files; 
        console.log(files)
    }


    /* Peticion a Email JS api */
    const sendEmail = (e) => {
        e.preventDefault();
        setLoading(true)
        emailjs.sendForm('service_v837z66', 'template_bkkbr1h', form.current, 'vSSQ5-PdZnwQ58Aof')
            .then((result) => {
                console.log(result.text);
                toast.success('Formulario enviado con éxito!', {
                    position: "bottom-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setLoading(false);
                setFiles(null)
            }).catch((error) => {
                console.log(error);
                toast.error(`Algo salio mal ${error}`, {
                    position: "bottom-right",
                    autoClose: 700,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setLoading(false);
                setFiles(null) 
            });
        e.target.reset()
    }
    /*---------------*/

    return(
        <>
        <form ref={form} onDragLeave={handleDragLeave} onDragOver={handleDragOver} onDrop={handleDrop} onSubmit={sendEmail} className="contact__form" action="">
            <h1>Drag & Drop</h1>
            
            <div className={class2}>
                <h2>Arrastra y suelta el CV.</h2>
                <span>o</span>
                <input name="file" ref={inputRef} id="inputFiles" type="file" onChange={(event) => {
                    setFiles(event.target.files);
                }} required hidden/>
                <button className="button" onClick={() => inputRef.current.click()}>Examina tus archivos</button>
            </div>
            <ul>
                {files ? Array.from(files).map((file, idx) => <li key={idx}>{file.name}</li>) : <li>No hay archivos</li>}
            </ul>
            
            <button className="button">{loading ? <span>Enviando...</span> : <span>Enviar</span>}</button>
            
        </form>
        <ToastContainer />
        </>
    )
}

export default DragDrop;