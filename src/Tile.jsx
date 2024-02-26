export function Tile({ content: Content, flip,play, state }) {
  switch (state) {
    case "start":
      return (
        <Back
          className="inline-block h-full w-full bg-indigo-300 text-center rounded-lg hover:cursor-pointer"
          flip={flip}
          play={play}
        />
      );
    case "flipped":
      return (
        <Front className="inline-block h-full w-full text-white bg-blue-700 rounded-lg">
          <Content
            style={{
              display: "inline-block",
              width: "100%",
              height: "100%",
              verticalAlign: "top",
            }}
          />
        </Front>
      );
    case "matched":
      return (
        <Matched className="inline-block h-full w-full text-indigo-200">
          <Content
            style={{
              display: "inline-block",
              width: "100%",
              height: "100%",
              verticalAlign: "top",
            }}
          />
        </Matched>
      );
    default:
      throw new Error("Invalid state " + state);
  }
}

function Back({ className, flip,play }) {
  return <div onClick={()=>{flip(), play()}} className={className}></div>;
}

function Front({ className, children }) {
  return <div className={className}>{children}</div>;
}

function Matched({ className, children }) {
  return <div className={className}>{children}</div>;
}
