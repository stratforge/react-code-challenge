import React from "react";

function Stats({
    total,
    success,
    failures
}) {
    return (
        <>
            <div>
                <div className="font-large">{total}</div>
                <div className="text-center">Launches</div>
            </div>
            <div>
                <div className="font-large">{success}</div>
                <div className="text-center">Success</div>
            </div>
            <div>
                <div className="font-large">{failures}</div>
                <div className="text-center">Failures</div>
            </div>
        </>
    )
}

export default React.memo(Stats);