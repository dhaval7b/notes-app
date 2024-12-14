import React from 'react';
import { Card, CardActions, CardContent, Modal,  Container, Typography, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { deleteNote, getNoteById, updateNote } from "../apiService";
import CreateOrUpdateNote from '../components/CreateOrUpdateNote'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { Button } from '@mui/material'
import { pretifyDate } from "../util";

const NoteDetails = () => {
    const {id} = useParams();
    const history = useHistory();
    const [note, setNote] = useState({});
    const [open, setOpen] = useState(false);
    useEffect(()=>{
        const fetchNote = async () => {
            const data = await getNoteById(id);
            setNote(data);
        };
        fetchNote();
    },[id])

    const handleDelete = async (id) => {
        await deleteNote(id);
        history.push("/")
    }

    const handleEdit = () => {
        setOpen(true);
    }
    const handleClose = async () => {
        setOpen(false);
        const newNote = await getNoteById(id);
        setNote(newNote);
    }

    const handleReturn = () => {
       history.push("/")
    }
    return ( <>
    <Container
        maxWidth="md"
        sx={{
            padding: { xs: 2, sm: 3, md: 4 },
            display: "flex",
            flexDirection: "column",
            gap: 3,
        }}
    >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="h4" sx={{ flexGrow: 1, fontSize: { xs: "1.8rem", sm: "2.2rem" } }}>
            Note Details
            </Typography>
            <Button onClick={handleReturn} startIcon={<KeyboardReturnIcon />}>
            Return
            </Button>
        </Box>
       {/* <Typography variant="h4" style={{marginTop : "20px"}}>Edit Note</Typography>
       <Button onClick={handleReturn}>
        Return &nbsp;
        <KeyboardReturnIcon></KeyboardReturnIcon> */}
       {/* </Button> */}
        <Card sx={{ boxShadow: 3, width: '100%', maxWidth: '600px', margin: 'auto' }}>
            <CardContent>
                <Typography variant="h6" sx={{ fontSize: { xs: "1.2rem", sm: "1.5rem" } }}>  { ` Title : ${note.title}`}</Typography>
                <Typography 
                    variant="body2"
                    sx={{
                        marginTop: 2,
                        wordBreak: "break-word",
                        fontSize: { xs: "0.9rem", sm: "1rem" },
                      }}> 
                      { `content : ${note.content}`}
                </Typography>
                <Typography 
                    variant="body2"
                    sx={{ marginTop: 1, fontSize: { xs: "0.8rem", sm: "0.9rem" }, color: "text.secondary" }}
                > 
                    { `created on : ${pretifyDate(note.createTime)}`}
                </Typography>
            </CardContent>
            
            <CardActions
            sx={{
                display: "flex",
                justifyContent: { xs: "center", sm: "flex-end" },
                gap: 2,
                padding: 2,
                flexWrap: "wrap",
              }}
            >
                <Button 
                    variant="contained" 
                    color="secondary" 
                    sx={{ fontSize: { xs: "0.7rem", sm: "0.9rem" }, padding: { xs: "6px 12px", sm: "8px 16px" }, maxWidth: "100%" }} 
                    onClick={handleEdit}
                >
                    Edit
                </Button>
                <Button 
                    variant="outlined" 
                    color="error" 
                    sx={{ fontSize: {  xs: "0.7rem", sm: "0.9rem" }, padding: { xs: "6px 12px", sm: "8px 16px"  }, maxWidth: "100%"  }}
                    onClick={() => {handleDelete(id)}}
                >
                    Delete
                </Button>
            </CardActions>
        </Card>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }} 
        >
            <CreateOrUpdateNote handleClose={handleClose} />
        </Modal>
    </Container>
    </> );
}
 
export default NoteDetails;