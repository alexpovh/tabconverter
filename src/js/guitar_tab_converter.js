var notesBaseLine = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"],
    guitarTabExample = "e|-0------3-1-0--------------------0--------3-1-0--------0-4-5-|\n" +
        "B|---1-0--------3-1-3-0--0-1-0-------1-0-----------3-1-3-------|\n" +
        "G|2------0---------------------2----------0--------------------|\n" +
        "D|-------------------------------2-----------------------------|\n" +
        "A|-------------------------------------------------------------|\n" +
        "E|-------------------------------------------------------------|";

function guitarToPianoNote(stringFirstNote, fretNum) {
    var fretNoteIdx = notesBaseLine.indexOf(stringFirstNote);
    return notesBaseLine[(fretNoteIdx + fretNum) % notesBaseLine.length];
}

function guitarTabToPianoNotes(guitarTab) {
    var pianoNotes = [],
        charAtRowIdx = 0,
        i, tabChar, lastChar, currentStringNote, pianoNote;
    // prepare tuning and data arrays
    for (i = 0; i < guitarTab.length; i++) {
        tabChar = guitarTab.charAt(i);
        if (!lastChar || lastChar === "\n") {
            // add to tuning
            currentStringNote = tabChar.toUpperCase();
            // reset row index counter
            charAtRowIdx = 0;
        }
        lastChar = tabChar;
        charAtRowIdx += 1;
        if (!isNaN(parseInt(tabChar))) {
            pianoNote = pianoNotes[charAtRowIdx];
            // see if we already have a note at that position
            pianoNote = (pianoNote ? pianoNote : "") + guitarToPianoNote(currentStringNote, tabChar);
            pianoNotes[charAtRowIdx] = pianoNote;
        }
    }
    // remove undefined elements
    for (i = 0; i < pianoNotes.length; i++) {
        if (!pianoNotes[i]) {
            pianoNotes.splice(i--, 1);
        }
    }
    // covert to string
    return pianoNotes.join(",");
}

console.log(guitarTabToPianoNotes(guitarTabExample));