import React from 'react';
import { Box, Typography, TextField, Button } from "@mui/material";
import { createNote, updateNote } from "../apiService";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useParams } from "react-router-dom";

const CreateOrUpdateNote = ({type, handleClose}) => {
    const [note, setNote] = useState({title : "", content : "", id:"", createTime: ""});
    const [errors, setErrors] = useState({title: "", content: ""});
    const {id} = useParams();
    const validate = () => {
        let tempErrors = { title: "", content: ""}
        if( note.title.length > 50) tempErrors.title = "Title can't be longer than 50 characters";
        if( note.content.length > 200) tempErrors.content = "Content can't be longer than 200 characters";
        setErrors(tempErrors);
        return Object.values(tempErrors).every(x => x ==="")
    }
    const handleCreate = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        const currentTimeStamp = new Date()
        console.log(currentTimeStamp)
        const updatedNote = {...note, id : uuidv4(), createTime : currentTimeStamp.toISOString() }
        setNote(updatedNote);
        type === "create" ? await createNote(updatedNote) : await updateNote(id, updatedNote);
        handleClose();
    }

    useEffect(()=>{
        
    }, [note])
    return ( 
    <Box sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: { xs: "90%", sm: "70%", md: "50%" },
        bgcolor: "background.paper",
        boxShadow: 24,
        borderRadius: 2,
        p: 4,
      }}
    >
        <Typography id="modal-modal-title" gutterBottom variant="h6" component="h2"  style={{marginTop : "20px"}}>
        { type === "create" ? "Create a new note" : "Update note"}
        </Typography>
        <form noValidate onSubmit={handleCreate}>
            <TextField 
                fullWidth
                label="title"
                name="title"
                value={note.title}
                sx={{ marginY: 2 }}
                error={!!errors.title}
                helperText={errors.title}
                onChange={(e) => setNote({...note, [e.target.name] : e.target.value})}
            > </TextField>
            <TextField
                fullWidth
                label="content"
                name="content"
                value={note.content}
                multiline
                rows={4}
                sx={{ marginY: 2 }}
                error={!!errors.content}
                helperText={errors.content}
                onChange={(e) => setNote({...note, [e.target.name] : e.target.value})}
            > </TextField>
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                <Button type="submit" color="secondary" variant="contained" style={{marginBottom : "20px", marginRight: "10px"}}>
                    { type == "create" ? "Create " : "Update" }
                </Button>
                <Button color="secondary" variant="outlined" style={{marginBottom : "20px"}} onClick={handleClose}>
                    cancel
                </Button>
            </Box>
        </form>
    </Box> );
}
 
export default CreateOrUpdateNote;