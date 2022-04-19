import './style.scss';

function ScrollDownArrow() {
    return (
        <div className="arrow-container animated fadeInDown">
            <div className="arrow-2">
                <i className="fa fa-angle-down"></i>
            </div>
            <div className="arrow-1 animated hinge infinite zoomIn"></div>
        </div>
    )
}

export default ScrollDownArrow;