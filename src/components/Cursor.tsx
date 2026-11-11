import React, { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';

const Cursor: React.FC = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) return;

        const cursor = cursorRef.current;
        const follower = followerRef.current;

        let ticking = false;
        const onMouseMove = (e: MouseEvent) => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    gsap.to(cursor, {
                        x: e.clientX,
                        y: e.clientY,
                        duration: 0.1,
                        ease: "power2.out",
                        overwrite: 'auto'
                    });
                    gsap.to(follower, {
                        x: e.clientX,
                        y: e.clientY,
                        duration: 0.35,
                        ease: "power3.out",
                        overwrite: 'auto'
                    });
                    ticking = false;
                });
                ticking = true;
            }
        };

        const onMouseDown = () => {
            gsap.to([cursor, follower], { scale: 0.8, duration: 0.2 });
        };

        const onMouseUp = () => {
            gsap.to([cursor, follower], { scale: 1, duration: 0.2 });
        };

        const onMouseEnterLink = () => {
            gsap.to(cursor, { scale: 1.8, opacity: 0.8, duration: 0.25 });
            gsap.to(follower, { scale: 2.2, borderColor: '#00F0FF', opacity: 0.6, duration: 0.25 });
        };

        const onMouseLeaveLink = () => {
            gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.25 });
            gsap.to(follower, { scale: 1, borderColor: '', opacity: 0.3, duration: 0.25 });
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mouseup', onMouseUp);

        const links = document.querySelectorAll('a, button');
        links.forEach(link => {
            link.addEventListener('mouseenter', onMouseEnterLink);
            link.addEventListener('mouseleave', onMouseLeaveLink);
        });

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mouseup', onMouseUp);
            links.forEach(link => {
                link.removeEventListener('mouseenter', onMouseEnterLink);
                link.removeEventListener('mouseleave', onMouseLeaveLink);
            });
        };
    }, []);

    return (
        <>
            <div
                ref={cursorRef}
                className="pointer-events-none fixed top-0 left-0 z-[9999] size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary hidden md:block"
            />
            <div
                ref={followerRef}
                className="pointer-events-none fixed top-0 left-0 z-[9998] size-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary opacity-30 hidden md:block"
            />
        </>
    );
};

export default Cursor;
