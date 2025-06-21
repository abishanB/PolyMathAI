import React from 'react';
import styles from './feed.module.css';

const posts = [
    {
        id: 1,
        user: 'Alice',
        avatar: '/window.svg',
        time: '2h ago',
        content: 'Excited to join PolyMathAI! 🚀',
        image: '/globe.svg',
    },
    {
        id: 2,
        user: 'Bob',
        avatar: '/next.svg',
        time: '3h ago',
        content: 'Just finished my onboarding. Ready to learn!',
        image: '',
    },
    {
        id: 3,
        user: 'Carol',
        avatar: '/vercel.svg',
        time: '5h ago',
        content: 'Anyone up for a study group this weekend?',
        image: '',
    },
];

export default function FeedPage() {
    return (
        <main className={styles.feedContainer}>
            <h1 className={styles.title}>Timeline</h1>
            <div className={styles.feedList}>
                {posts.map(post => (
                    <div key={post.id} className={styles.postCard}>
                        <div className={styles.postHeader}>
                            <img src={post.avatar} alt={post.user} className={styles.avatar} />
                            <div>
                                <span className={styles.user}>{post.user}</span>
                                <span className={styles.time}>{post.time}</span>
                            </div>
                        </div>
                        <div className={styles.content}>{post.content}</div>
                        {post.image && <img src={post.image} alt="post" className={styles.postImage} />}
                    </div>
                ))}
            </div>
        </main>
    );
}
