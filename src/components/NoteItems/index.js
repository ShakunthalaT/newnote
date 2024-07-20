import "./index.css";

const NoteItems = () => {
  const { noteDetails } = this.state;
  const { titleText, noteText } = noteDetails;

  return (
    <li className="list">
      <h1>{titleText}</h1>
      <p>{noteText}</p>
    </li>
  );
};

export default NoteItems;
