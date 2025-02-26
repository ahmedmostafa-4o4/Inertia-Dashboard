import { Link } from "@inertiajs/react";
function TinyTable({title, link }) {
    return (
        <div className="tiny-table">
            <div className="head">
                <h2>{title}</h2> <Link href={route(link)}>View All</Link>
            </div>
            <div className="body">
                <div>
                    <img src="/images/default-user.jpg" alt="" />
                    <div>
                        <h6>ahmedmostafa@gmail.com</h6>
                        <p className="user-name">Ahmed Mostafa</p>
                    </div>
                    <div>
                        <h6>Created At</h6>
                        <p className="created-at">2024-8-31</p>
                    </div>
                </div>
                <div>
                    <img src="/images/default-user.jpg" alt="" />
                    <div>
                        <h6>ahmedmostafa@gmail.com</h6>
                        <p className="user-name">Ahmed Mostafa</p>
                    </div>
                    <div>
                        <h6>Created At</h6>
                        <p className="created-at">2024-8-31</p>
                    </div>
                </div>
                <div>
                    <img src="/images/default-user.jpg" alt="" />
                    <div>
                        <h6>ahmedmostafa@gmail.com</h6>
                        <p className="user-name">Ahmed Mostafa</p>
                    </div>
                    <div>
                        <h6>Created At</h6>
                        <p className="created-at">2024-8-31</p>
                    </div>
                </div>
                <div>
                    <img src="/images/default-user.jpg" alt="" />
                    <div>
                        <h6>ahmedmostafa@gmail.com</h6>
                        <p className="user-name">Ahmed Mostafa</p>
                    </div>
                    <div>
                        <h6>Created At</h6>
                        <p className="created-at">2024-8-31</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TinyTable;
