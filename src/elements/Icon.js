function Icon({
    src,
    title,
    callback
}) {
    return <img
        className="icon-image margin-x"
        src={src}
        title={title}
        onClick={callback}
        alt="Nil"
    ></img>
}

export default Icon;