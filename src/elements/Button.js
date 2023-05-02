import React from "react";

function Button({
    callback,
    name
}) {
    return (
        <button title='name' onClick={callback} className="button">{name}</button>
    )
}

export default React.memo(Button);