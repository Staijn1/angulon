export enum WebsocketMessage {
  GetLedstripState = "getState",
  SetNetworkState = "setState",
  GetModes = "getModes",
  GetGradients = "getGradients",
  RegisterAsUser = "joinUserRoom",
  SetFFTValue = "FFT",
  StateChange = "stateChange",
  LedstripFFT = ".",
  LedstripSetState = "!",
  GetNetworkState = "getNetworkState",
  CreateRoom = "createRoom",
  RemoveRoom = "removeRoom",
  DatabaseChange = "databaseChange",
  RenameDevice = "renameDevice",
  AssignDeviceToRoom = "assignDeviceToRoom"
}
