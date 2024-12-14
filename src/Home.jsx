import { Button, Container, Typography, Card, CardContent, Modal, Grid, Box } from "@mui/material";
import { useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { getAllNotes } from "./apiService";
import { Link } from "react-router-dom";
import CreateOrUpdateNote from './components/CreateOrUpdateNote'
import { pretifyDate } from "./util";
const Home = () => {
    const [notes, setNotes] = useState([]);
    const [open, setOpen] = useState(false);
    const fetchNotes = async () =>{
        const data  = await getAllNotes();
        setNotes(data);
    }
    const handleCreate = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
        fetchNotes();
    }

    
    useEffect(() => {
        fetchNotes();
    }, [])
    return ( 
        <>
        
            <Container>
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
                
                <Grid container spacing={2} direction="column">
                    {notes.length > 0 ? (notes.map((note) => (
                        <Grid  item xs={12} sm={6} md={4} key={note.id}>
                            <Link to={`/notes/${note.id}`} style={{textDecoration: 'none'}} >
                                <Card  style={{marginBottom : '20px'}}>
                                    <CardContent>
                                        <Typography variant="h5" noWrap gutterBottom>{note.title}</Typography>
                                        <Typography 
                                            variant="body2" 
                                            gutterBottom
                                            sx={{ marginTop: 1, fontSize: { xs: "0.8rem", sm: "0.9rem" }, color: "text.secondary" }}
                                        >{pretifyDate(note.createTime)}</Typography>
                                    </CardContent>
                                    
                                </Card>
                            </Link>
                        </Grid>
                    ))) : (
                        <Typography>
                            No notes available
                        </Typography>
                    )}
                </Grid>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backdrop: "transparent",
                        
                    }}
                    >
                        <CreateOrUpdateNote type={"create"} handleClose={handleClose}/>
                </Modal>
            </Container>
        </>
    );
}
 
export default Home;