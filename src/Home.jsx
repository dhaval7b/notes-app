import { Button, Container, Typography, Card, CardContent, CardActions, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { deleteNote, getAllNotes } from "../apiService";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from "react-router-dom";
import CreateNote from './pages/CreateNote'
const Home = () => {
    const [notes, setNotes] = useState([]);
    const [open, setOpen] = useState(false);
    const fetchNotes = async () =>{
        const data  = await getAllNotes();
        // console.log(data)
        setNotes(data);
        // console.log(notes)
    }
    const handleCreate = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
        fetchNotes();
    }

    const handleDelete = async (id) => {
        await deleteNote(id);
        await fetchNotes();
    }
    useEffect(() => {
        fetchNotes();
    }, [])
    return ( 
        <>
            <Container>
                <div>
                    <Typography 
                        variant="h4" 
                        gutterBottom 
                    >
                        Notes
                    </Typography>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={handleCreate}
                        style={{marginBottom : '20px'}}>Create New <AddIcon></AddIcon>
                    </Button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        >
                        <CreateNote handleClose={handleClose}>

                        </CreateNote>
                    </Modal>
                    {notes.length > 0 ? (notes.map((note) => (
                        <Card key={note.id} style={{marginBottom : '20px'}}>
                            <CardContent>
                                <Typography variant="h4" noWrap gutterBottom>{note.title}</Typography>
                                <Typography variant="p" gutterBottom>{note.createTime.toLocaleString()}</Typography>
                            </CardContent>
                            <CardActions>
                                <Link to={`/notes/${note.id}`} style={{textDecoration: 'none'}} >
                                    <Button color="secondary">
                                        <EditIcon></EditIcon>
                                    </Button>
                                </Link>
                                <Button onClick={() => {handleDelete(note.id)}} color="error" >
                                    <DeleteIcon/>
                                </Button>
                            </CardActions>
                        </Card>
                    ))) :
                    (
                        <Typography>
                            No notes available
                        </Typography>
                    )}
                    
                </div>
            </Container>
        </>
    );
}
 
export default Home;