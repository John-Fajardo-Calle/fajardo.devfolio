import React from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';

const FadingText = ({
                        oldText,
                        newText,
                        isFlipped,
                        duration = 700,
                        className = '',
                        mode = 'inline', // 'inline' | 'block'
                    }) => {
    const transition = { duration: duration / 1000, ease: 'easeInOut' };

    if (mode === 'block') {
        // Solución para About: cada texto en su propio flujo (nunca solapados)
        return (
            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={isFlipped ? 'new' : 'old'}
                    className={className}
                    initial={{ opacity: 0, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, filter: 'blur(8px)' }}
                    transition={transition}
                    style={{ width: '100%' }}
                >
                    {isFlipped ? newText : oldText}
                </motion.div>
            </AnimatePresence>
        );
    }

    // Inline mode para títulos y links (default)
    const componentRootStyle = {
        display: 'inline-block',
        position: 'relative',
        verticalAlign: 'baseline',
        whiteSpace: 'pre-wrap',
    };

    const sizerTextStyle = {
        visibility: 'hidden',
        display: 'inline-block',
        whiteSpace: 'pre-wrap',
        lineHeight: 0,
        margin: 0,
        height: 0,
        overflow: 'hidden',
    };

    const textStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'inline-block',
        whiteSpace: 'pre-wrap',
        margin: 0,
    };

    return (
        <span className={`animated-text-root ${className}`} style={componentRootStyle}>
            <span style={sizerTextStyle}>{oldText}</span>
            <span style={sizerTextStyle}>{newText}</span>
            <motion.span
                style={textStyle}
                animate={isFlipped ? { opacity: 0, filter: 'blur(4px)' } : { opacity: 1, filter: 'blur(0px)' }}
                transition={transition}
            >
                {oldText}
            </motion.span>
            <motion.span
                style={textStyle}
                animate={isFlipped ? { opacity: 1, filter: 'blur(0px)' } : { opacity: 0, filter: 'blur(4px)' }}
                transition={transition}
            >
                {newText}
            </motion.span>
        </span>
    );
};

FadingText.propTypes = {
    oldText: PropTypes.node.isRequired,
    newText: PropTypes.node.isRequired,
    isFlipped: PropTypes.bool.isRequired,
    duration: PropTypes.number,
    className: PropTypes.string,
    mode: PropTypes.oneOf(['inline', 'block']),
};

export default FadingText;

