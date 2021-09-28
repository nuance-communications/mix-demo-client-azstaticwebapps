export const NEEDS_INPUT = "needsInput"

const speakingStyle = {
    tag: 'style',
    name: 'Speaking Style',
    container: true,
    attributes: ['name'],
    options: {
        neutral: {
            name: 'neutral'
        },
        lively: {
            name: 'lively'
        },
        forceful: {
            name: 'forceful'
        },
        apologetic: {
            name: 'apologetic'
        },
    }
}

const pause = {
    tag: 'break',
    container: false,
    name: 'Pause',
    attributes: ['strength', 'time'],
    options: {
        'x-weak': {
            strength: 'x-weak'
        },
        weak: {
            strength: 'weak'
        },
        medium: {
            strength: 'medium'
        },
        strong: {
            strength: 'strong'
        },
        'x-strong': {
            strength: 'x-strong'
        },
        none: {
            strength: 'none'
        },
        '...s': {
            time: 's',
            suffix: 's',
            [`${NEEDS_INPUT}`]: true
        },
        '...ms': {
            time: 'ms',
            suffix: 'ms',
            [`${NEEDS_INPUT}`]: true
        }
    }
}

const timbre = {
    tag: 'prosody',
    container: true,
    name: 'Timbre',
    attributes: ['timbre'],
    options: {
        'x-young': {
            timbre: 'x-young'
        },
        young: {
            timbre: 'young'
        },
        medium: {
            timbre: 'medium'
        },
        default: {
            timbre: 'default'
        },
        old: {
            timbre: 'old'
        },
        'x-old': {
            timbre: 'x-old'
        },
        '...': {
            timbre: '',
            [`${NEEDS_INPUT}`]: true
        },
    }
}

const pitch = {
    tag: 'prosody',
    container: true,
    name: 'Pitch',
    attributes: ['pitch'],
    options: {
        'x-low': {
            pitch: 'x-low'
        },
        low: {
            pitch: 'low'
        },
        medium: {
            pitch: 'medium'
        },
        default: {
            pitch: 'default'
        },
        high: {
            pitch: 'high'
        },
        'x-high': {
            pitch: 'x-high'
        },
        '+...%': {
            pitch: '+%',
            prefix: '+',
            suffix: '%',
            [`${NEEDS_INPUT}`]: true
        },
        '-...%': {
            pitch: '-%',
            prefix: '-',
            suffix: '%',
            [`${NEEDS_INPUT}`]: true
        },
    }
}

const speechRate = {
    tag: 'prosody',
    container: true,
    name: 'Speech Rate',
    attributes: ['rate'],
    options: {
        'x-slow': {
            rate: 'x-slow'
        },
        slow: {
            rate: 'slow'
        },
        medium: {
            rate: 'medium'
        },
        default: {
            rate: 'default'
        },
        fast: {
            rate: 'fast'
        },
        'x-fast': {
            rate: 'x-fast'
        },
        '...': {
            rate: '',
            [`${NEEDS_INPUT}`]: true
        },
        '+...': {
            rate: '+',
            prefix: '+',
            [`${NEEDS_INPUT}`]: true
        },
        '-...': {
            rate: '-',
            prefix: '-',
            [`${NEEDS_INPUT}`]: true
        },
        '+...%': {
            rate: '+%',
            prefix: '+',
            suffix: '%',
            [`${NEEDS_INPUT}`]: true
        },
        '-...%': {
            rate: '-%',
            prefix: '-',
            suffix: '%',
            [`${NEEDS_INPUT}`]: true
        },
    } 
}

export const SSML_OPTIONS = {
    speakingStyle,
    pause,
    timbre,
    pitch,
    speechRate
}