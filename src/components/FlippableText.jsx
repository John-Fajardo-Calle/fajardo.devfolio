import React from 'react';
import PropTypes from 'prop-types';

const FlippableText = ({ oldText, newText, isFlipped, duration = 600, className = '' }) => {
    const componentRootStyle = {
        perspective: '1500px',
        display: 'inline-block',
        verticalAlign: 'baseline',
    };


    const cardStyle = {
        transition: `transform ${duration / 1000}s cubic-bezier(0.45, 0, 0.55, 1)`,
        transformStyle: 'preserve-3d',
        transformOrigin: 'center',
        willChange: 'transform',
        transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        display: 'inline-grid',
    };


    const sizerTextStyle = {
        visibility: 'hidden',
        gridColumn: 1,
        gridRow: 1,
        display: 'inline-block',
        textAlign: 'inherit',
    };

    const faceStyle = {
        gridColumn: 1,
        gridRow: 1,
        width: '100%',
        height: '100%',
        backfaceVisibility: 'hidden',
        display: 'inline-block',
        textAlign: 'inherit',
    };

    const frontFaceStyle = {
        ...faceStyle,
    };

    const backFaceStyle = {
        ...faceStyle,
        transform: 'rotateY(180deg)',
    };

    return (
        <span className={`flippable-text-root ${className}`} style={componentRootStyle}>
            <span className="flippable-text-card" style={cardStyle}>
                <span style={sizerTextStyle}>{oldText}</span>
                <span style={sizerTextStyle}>{newText}</span>

                <span className="flippable-text-front" style={frontFaceStyle}>
                    {oldText}
                </span>
                <span className="flippable-text-back" style={backFaceStyle}>
                    {newText}
                </span>
            </span>
        </span>
    );
};

FlippableText.propTypes = {
    oldText: PropTypes.node.isRequired,
    newText: PropTypes.node.isRequired,
    isFlipped: PropTypes.bool.isRequired,
    duration: PropTypes.number,
    className: PropTypes.string,
};

export default FlippableText;