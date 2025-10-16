import React from 'react';
import { Container, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogData'; // Importamos los datos del blog

function BlogListPage() {
  return (
    <Container as="main" className="section">
      <nav className="breadcrumb">
        <Link to="/">Inicio</Link> / <span>Blog</span>
      </nav>
      <h1 style={{ margin: '0 0 .8rem 0' }}>Blog</h1>

      <section className="products" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 'var(--g4)' }}>
        {blogPosts.map(post => (
          <Card as="article" key={post.id} style={{ padding: 0, overflow: 'hidden' }}>
            <Link to={`/blog/${post.id}`} aria-label={post.title}>
              <figure style={{ margin: 0, height: '160px', overflow: 'hidden' }}>
                <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </figure>
            </Link>
            <div style={{ padding: 'var(--g3)' }}>
              <Link to={`/blog/${post.id}`} style={{ fontWeight: 700, display: 'block', color: '#fff' }}>
                {post.title}
              </Link>
              <div className="meta" style={{ fontSize: '.9rem' }}>{post.author} · {post.date} · {post.category}</div>
              <p className="meta" style={{ margin: '.5rem 0 0 0' }}>{post.summary}</p>
              <div style={{ marginTop: '10px' }}>
                <Link className="btn btn-ghost" to={`/blog/${post.id}`}>Leer más</Link>
              </div>
            </div>
          </Card>
        ))}
      </section>
    </Container>
  );
}

export default BlogListPage;