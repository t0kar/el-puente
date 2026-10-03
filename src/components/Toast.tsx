/** short status message at the bottom of the screen; drive it with hooks/useToast */
export const Toast = ({ msg }: { msg: string | null }) => {
  return msg ? (
    <div className="toast" role="status">
      {msg}
    </div>
  ) : null;
};
