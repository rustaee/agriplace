import { Button, Chip, TextField, TextareaAutosize } from "@mui/material";
import { useState } from "react";

import styled from "styled-components";
import { Vegetable } from "types/Vegetable";

interface VegetableFormProps {
  Vegetable?: Vegetable;
  onCancel: () => void;
  onSubmit: (Vegetable: VegetableEdit) => void;
}

export interface VegetableEdit extends Omit<Vegetable, "id"> {
  id?: string;
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  margin: 20px;
  padding: 20px;
  min-height: 30vh;
  width: clamp(300px, 80%, 800px);

  .actions {
    display: flex;
    gap: 20px;
    justify-content: flex-end;
    width: 100%;
  }
`;

const StyledTextarea = styled(TextareaAutosize)`
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 12px;
  border-radius: 12px 12px 0 12px;
  color: #000;
  background: #fff
  border: 1px solid gray;

  &:hover {
    border-color: #555;
  }

  &:focus {
    border-color:  blue;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`;
const VegetableForm: React.FC<VegetableFormProps> = ({
  onCancel,
  onSubmit,
  Vegetable,
}) => {
  // States
  const [id] = useState(Vegetable?.id);
  const [name, setName] = useState(Vegetable?.name || "");
  const [description, setDescription] = useState(Vegetable?.description || "");
  const [tag, setTag] = useState(""); // tag is temporary
  const [tags, setTags] = useState<string[]>(Vegetable?.tags ?? []); // tags is the final array

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ id, name, description, tags });
  };

  const addToTags = (e: React.KeyboardEvent) => {
    e.preventDefault();
    if (tag === "") return;
    setTags([...tags, tag]);
    setTag("");
  };

  const removeTag = (index: number) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  };

  return (
    <>
      <Form onSubmit={(e) => handleSubmit(e)}>
        {/* Name */}
        <TextField
          fullWidth
          id="outlined-basic"
          label="Vegetable name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Description  */}
        <StyledTextarea
          style={{ width: "100%" }}
          minRows={5}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Tags */}
        <TextField
          fullWidth
          id="outlined-basic"
          label="Tags"
          variant="outlined"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") addToTags(e); // add to tags array when user press enter
          }}
        />
        {/* Show the tags */}
        <div className="tags">
          {tags.map((tag, index) => (
            <Chip
              label={tag}
              key={index}
              onDelete={() => removeTag(index)}
              style={{ marginRight: "4px" }}
            />
          ))}
        </div>

        {/* Actions */}
        <div className="actions">
          <Button
            variant="text"
            color="primary"
            style={{ color: "gray" }}
            onClick={() => onCancel()}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onKeyDown={(e) => {
              if (e.key === "Enter") e.preventDefault();
            }} // prevent form submit when user press enter Because we want to add to tags array
            variant="contained"
            style={{ backgroundColor: "#59A96A", color: "#fff" }}
          >
            Save
          </Button>
        </div>
      </Form>
    </>
  );
};

export default VegetableForm;
