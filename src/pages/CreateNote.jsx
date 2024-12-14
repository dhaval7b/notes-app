import { Box, Container, Typography, TextField, Button } from "@mui/material";
import { createNote } from "../../apiService";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const CreateNote = ({handleClose}) => {
    const [note, setNote] = useState({title : "", content : "", id:"", createTime: ""});
    const handleCreate = async (e) => {
        e.preventDefault();
        const currentTimeStamp = new Date()
        console.log(currentTimeStamp)
        const updatedNote = {...note, id : uuidv4(), createTime : currentTimeStamp.toISOString() }
        setNote(updatedNote);
        await createNote(updatedNote);
        handleClose();
    }
    
    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        backgroundColor : 'white',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    useEffect(()=>{
        
    }, [note])
    return ( <>
    <Container style={modalStyle}>
        <Box>
            <Typography id="modal-modal-title" gutterBottom variant="h6" component="h2"  style={{marginTop : "20px"}}>
            Create a new note
            </Typography>
            <form noValidate onSubmit={handleCreate}>
            <TextField 
                fullWidth
                label="title"
                name="title"
                value={note.title}
                style={{marginTop: "20px", marginBottom:"10px"}}
                onChange={(e) => setNote({...note, [e.target.name] : e.target.value})}
            > </TextField>
            <TextField
                fullWidth
                label="content"
                name="content"
                value={note.content}
                style={{marginTop: "10px", marginBottom:"20px"}}
                onChange={(e) => setNote({...note, [e.target.name] : e.target.value})}
            > </TextField>
            <Button type="submit" color="secondary" variant="contained" style={{marginBottom : "20px", marginRight: "10px"}}>
                Create
            </Button>
            <Button color="secondary" variant="outlined" style={{marginBottom : "20px"}} onClick={handleClose}>
                cancel
            </Button>
            </form>
        </Box>
    </Container>
    </> );
}
 
export default CreateNote;