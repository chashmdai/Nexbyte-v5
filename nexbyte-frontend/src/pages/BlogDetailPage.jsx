import React from 'react';
import { Container, Card } from 'react-bootstrap';
import { Link, useParams, Navigate } from 'react-router-dom';
import { blogPosts } from '../data/blogData';

// Contenido de ejemplo para los posts
const postContent = {
    'mantenimiento-programado-v3': (<>
        <p>Durante este fin de semana realizaremos un mantenimiento programado de la plataforma Nexbyte v3. El objetivo es desplegar optimizaciones en la base de datos de productos, mejorar la indexación de búsqueda y ajustar los reportes del administrador.</p>
        <p><strong>Ventana estimada:</strong> sábado 22:00 a domingo 02:00 (hora de Chile). Durante ese período la tienda podría mostrar mensajes de “solo lectura” y no se podrán crear cuentas nuevas ni finalizar compras.</p>
    </>),
    '7-trucos-geek-setup': (<>
        <p>Si pasas muchas horas frente al PC, estos trucos pueden mejorar tu experiencia diaria. No necesitas gastar mucho: solo organización e intención.</p>
        <ol>
            <li><strong>Atajos de teclado universales:</strong> Ctrl/⌘+K (buscar), Ctrl/⌘+Shift+T (reabrir pestaña), Win+V (historial en Windows).</li>
            <li><strong>Ergonomía:</strong> eleva el monitor y usa una silla con soporte lumbar.</li>
        </ol>
    </>)
    // Agrega el resto del contenido de tus blogs aquí
};

function BlogDetailPage() {
    const { id } = useParams();
    const post = blogPosts.find(p => p.id === id);

    if (!post) {
        return <Navigate to="/blogs" replace />; // Redirige si el post no existe
    }

    return (
        <Container as="main" className="section">
            <nav className="breadcrumb">
                <Link to="/">Inicio</Link> / <Link to="/blogs">Blog</Link> / <span>{post.title}</span>
            </nav>
            <Card as="article" className="reveal in" style={{ padding: 'var(--g4)' }}>
                <h1 style={{ margin: '0 0 .25rem 0' }}>{post.title}</h1>
                <p className="meta" style={{ margin: '0 0 1rem 0' }}>{post.author} · {post.date} · {post.category}</p>
                <figure className="card" style={{ margin: '0 0 var(--g4)', height: '220px', overflow: 'hidden' }}>
                    <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </figure>
                
                {/* Contenido del post */}
                {postContent[post.id] || <p>Contenido no disponible.</p>}

                <div className="mt-4" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Link className="btn btn-ghost" to="/blogs">Volver</Link>
                </div>
            </Card>
        </Container>
    );
}

export default BlogDetailPage;