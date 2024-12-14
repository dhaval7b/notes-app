import { Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getNoteById, updateNote } from "../../apiService";


import { Button, TextField } from '@mui/material'

const NoteDetails = () => {
    const {id} = useParams();
    const history = useHistory();
    const [note, setNote] = useState({});
    useEffect(()=>{
        const fetchNote = async () => {
            const data = await getNoteById(id);
            setNote(data);
        };
        fetchNote();
    },[id])
    const handleUpdate = async () => {
        await updateNote(id, note);
        await handleCancel();
    }

    const handleCancel = () => {
       history.push("/")
    }
    return ( <>
    <Container>
       <Typography variant="h4" style={{marginTop : "20px"}}>Edit Note</Typography>
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
                onChange={(e) => setNote({...title, [e.target.name] : e.target.value})}
            > </TextField>
            <Button variant="contained" color="secondary" style={{marginRight: "10px"}} onClick={() => handleUpdate(id, note)}>
                Update
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleCancel}>
                Cancel
            </Button>
    </Container>
    </> );
}
 
export default NoteDetails;