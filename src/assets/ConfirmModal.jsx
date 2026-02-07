

export default function ConfirmModal({
  show,
  title = "Confirm",
  message,
  onConfirm,
  onCancel
}) {
  if (!show) return null;

  return (
    <>
      <div className="modal-backdrop fade show"></div>

      <div className="modal fade show d-block" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onCancel}
              />
            </div>

            <div className="modal-body">
              <p>{message}</p>
            </div>

            <div className="modal-footer">
              {/* <button className="btn btn-secondary" onClick={onCancel}>
                Cancel
              </button> */}
              <button className="btn btn-dark" onClick={onConfirm}>
                Confirm
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
