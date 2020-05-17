import React from 'react';
import './Post.scss';

const Post = (props) => {
    return (
        <section className='post-card'>
            <h3>{props.text}</h3>
        </section>
    )
}

export default Post;
