const system_id = "02181f8a-fb57-4e1f-a41d-756de5f9255f"

const base_url = "https://localhost:10000";
// const login_url = `https://localhost:7001/rest/v3/login/sessions`;
// const devices_url = `https://localhost:7001/rest/v3/devices`;
// const users_url = `https://localhost:7001/rest/v3/login/sessions/-`;

const login_url = `https://${system_id}.relay.vmsproxy.com/rest/v3/login/sessions`;
const devices_url = `https://${system_id}.relay.vmsproxy.com/rest/v3/devices`;
const local_devices_url = 'https://localhost:7001/rest/v3/devices/';
const users_url = `https://${system_id}.relay.vmsproxy.com/rest/v3/login/sessions/-`;

const dashboard_url = 'https://localhost:10000/dashboard'
const events_viewer_url = 'https://localhost:10000/dashboard/eventsViewer'
const mobile_connect_url = 'https://localhost:10000/dashboard/mobileConnect'
const playback_view_url = 'https://localhost:10000/dashboard/playbackView'

const sentry_url = 'https://172.20.10.2:10000/sentry'

export { base_url, login_url , users_url , dashboard_url , events_viewer_url , mobile_connect_url , playback_view_url , sentry_url, devices_url , system_id, local_devices_url }