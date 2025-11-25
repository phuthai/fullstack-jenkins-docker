'use client';

import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <main className="container">
            <div className="empty">
                <h2>Something went wrong!</h2>
                <p>{error.message}</p>
                <button
                    onClick={
                        // Attempt to recover by trying to re-render the segment
                        () => reset()
                    }
                    style={{
                        marginTop: '1rem',
                        padding: '0.5rem 1rem',
                        cursor: 'pointer',
                        background: 'var(--ring)',
                        color: 'var(--bg)',
                        border: 'none',
                        borderRadius: '4px',
                        fontWeight: 'bold'
                    }}
                >
                    Try again
                </button>
            </div>
        </main>
    );
}
