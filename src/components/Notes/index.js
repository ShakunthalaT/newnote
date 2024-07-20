import { Component } from "react";
import { v4 } from "uuid";
import NoteItems from "../NoteItems";
import "./index.css";

class Notes extends Component {
  state = {
    noteList: [],
    title: "",
    note: "",
  };

  onChangeTitle = (event) => {
    this.setState({ title: event.target.value });
  };

  onChangeNote = (event) => {
    this.setState({ note: event.target.value });
  };

  submitForm = (event) => {
    event.preventDefault();
    const { title, note } = this.state;

    const newList = {
      id: v4(),
      titleText: title,
      noteText: note,
    };

    this.setState((prevState) => ({
      noteList: [...prevState.noteList, newList],
      title: "",
      note: "",
    }));
  };

  render() {
    const { title, note, noteList } = this.state;
    return (
      <div className="main-container">
        <div>
          <h1 className="heading">Create Note</h1>
          <form className="form-container" onSubmit={this.submitForm}>
            <div className="search-container">
              <input
                id="title"
                type="search"
                className="input"
                value={title}
                onChange={this.onChangeTitle}
              />
            </div>
            <button type="submit" className="button">
              Add
            </button>
          </form>
        </div>
        <div>
          <ul className="ul-container">
            {noteList.map((each) => (
              <NoteItems key={each.id} noteDetails={each} />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Notes;
