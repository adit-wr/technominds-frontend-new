export function createPiniaMiddleware() {
  return (context) => {
    context.store.$onAction(({ name, store, args, after, onError }) => {
      console.log(`Action "${name}" in store "${store.$id}" with args:`, args);

      // Menghapus proteksi berdasarkan role
      const protectedActions = ["addItem", "updateItem", "deleteItem"];

      // Proteksi role dihapus sehingga semua user dapat melakukan action apa pun
      if (protectedActions.includes(name)) {
        console.log(`Action "${name}" executed without role restriction.`);
      }

      after((result) => {
        console.log(`Action "${name}" completed with result:`, result);
      });

      onError((error) => {
        console.error(`Action "${name}" failed with error:`, error);
      });
    });
  };
}
