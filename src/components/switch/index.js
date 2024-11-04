import Switch from "@mui/material/Switch";

const label = { inputProps: { "aria-label": "Color switch demo" } };

export default function Switches({ handleToggleDarkMode }) {
  return (
    <div
      style={{
        width: "90%",
        display: "flex",
        alignItems: "center",
        justifyContent: "end",
      }}
    >
      <p>Dark Mode</p>
      <Switch onChange={handleToggleDarkMode} {...label} color="primary" />
    </div>
  );
}