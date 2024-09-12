import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../Styles/Styles.css';
import { Container, Row, Col, Table, Alert, Button } from 'react-bootstrap';

function PerfilUsuario() {
    const { carnet } = useParams();
    const [usuario, setUsuario] = useState(null);
    const [cursosAprobados, setCursosAprobados] = useState([]);
    const [totalCreditos, setTotalCreditos] = useState(0);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Obtener los datos del usuario
                const usuarioResponse = await fetch(`http://localhost:5000/buscarUsuario/${carnet}`);
                const usuarioData = await usuarioResponse.json();
                
                if (usuarioResponse.ok) {
                    setUsuario(usuarioData.usuario);
                } else {
                    setError(usuarioData.mensaje);
                    return;
                }

                // Obtener los cursos aprobados y total de créditos
                const cursosResponse = await fetch(`http://localhost:5000/cursosAprobados/${carnet}`);
                const cursosData = await cursosResponse.json();

                if (cursosResponse.ok) {
                    setCursosAprobados(cursosData.cursos);
                    setTotalCreditos(cursosData.totalCreditos);
                } else {
                    setError(cursosData.mensaje);
                }
            } catch (error) {
                setError('Error al obtener datos');
            }
        };

        fetchData();
    }, [carnet]);

    return (
        <Container>
            <Row className="my-4">
                <Col>
                    <h1>Perfil del Usuario</h1>
                </Col>
            </Row>
            {error && (
                <Row className="my-4">
                    <Col>
                        <Alert variant="danger">{error}</Alert>
                    </Col>
                </Row>
            )}
            {usuario && (
                <Row className="my-4">
                    <Col>
                        <div className="mb-4">
                            <h2>Datos del usuario de carnet: </h2>
                            <h2><strong></strong> {usuario.carnet}</h2>
                        </div>
                    </Col>
                </Row>
            )}
            <Row className="my-4">
                <Col>
                    <h2>Cursos Aprobados</h2>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Curso</th>
                                <th>Fecha de Aprobación</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cursosAprobados.map((curso) => (
                                <tr key={curso.id_curso}>
                                    <td>{curso.nombre_curso}</td>
                                    <td>{new Date(curso.fecha_aprobacion).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Row className="my-4">
                <Col>
                    <h2>Total de Créditos</h2>
                    <p><strong>Total Créditos:</strong> {totalCreditos}</p>
                </Col>
            </Row>
            <Row className="my-4">
                <Col>
                    <Button variant="primary" onClick={() => window.history.back()}>Volver</Button>
                </Col>
            </Row>
        </Container>
    );
}

export default PerfilUsuario;
