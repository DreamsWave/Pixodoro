// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::env;
use tauri::{CustomMenuItem, Manager, SystemTray, SystemTrayEvent, SystemTrayMenu};
use tauri_plugin_positioner::{Position, WindowExt};

#[derive(Clone, serde::Serialize)]
struct Payload {
    args: Vec<String>,
    cwd: String,
}

// tauri command that updates the tray icon and updates the tooltip
#[tauri::command]
async fn update_tray_icon(app_handle: tauri::AppHandle, status: String, progress: f32) {
    let progress_rounded = progress.round() as i32;

    let image_path = match progress_rounded {
        0 => format!("icons/tray/favicon-default.png"),
        1..=11 => format!(
            "icons/tray/{status}/favicon-{status}-1.png",
            status = status
        ),
        12..=24 => format!(
            "icons/tray/{status}/favicon-{status}-12.png",
            status = status
        ),
        25..=36 => format!(
            "icons/tray/{status}/favicon-{status}-25.png",
            status = status
        ),
        37..=49 => format!(
            "icons/tray/{status}/favicon-{status}-37.png",
            status = status
        ),
        50..=61 => format!(
            "icons/tray/{status}/favicon-{status}-50.png",
            status = status
        ),
        62..=74 => format!(
            "icons/tray/{status}/favicon-{status}-62.png",
            status = status
        ),
        75..=86 => format!(
            "icons/tray/{status}/favicon-{status}-75.png",
            status = status
        ),
        87..=99 => format!(
            "icons/tray/{status}/favicon-{status}-87.png",
            status = status
        ),
        100 => format!(
            "icons/tray/{status}/favicon-{status}-100.png",
            status = status
        ),
        _ => format!("icons/tray/favicon-default.png"),
    };

    // Update icon
    if image_path != env::var("ICON_PATH").unwrap() {
        app_handle
            .tray_handle()
            .set_icon(tauri::Icon::File(
                app_handle
                    .path_resolver()
                    .resolve_resource(&image_path)
                    .unwrap(),
            ))
            .unwrap();
        env::set_var("ICON_PATH", &image_path);
    }

    // Update tooltip
    let status_name = if status == "pomodoro" {
        "Focus"
    } else {
        "Break"
    };
    let tooltip =
        &(status_name.to_string() + " - " + &(progress_rounded.to_string() + "%")).to_owned();
    let _ = app_handle.tray_handle().set_tooltip(&tooltip);
}

fn main() {
    env::set_var("RUST_BACKTRACE", "1");
    env::set_var("ICON_PATH", format!("icons/tray/favicon-default.png"));
    let quit = CustomMenuItem::new("quit".to_string(), "Quit");
    let system_tray_menu = SystemTrayMenu::new().add_item(quit);
    let system_tray = SystemTray::new().with_menu(system_tray_menu);

    tauri::Builder::default()
        .plugin(tauri_plugin_positioner::init())
        .plugin(tauri_plugin_single_instance::init(|app, argv, cwd| {
            println!("{}, {argv:?}, {cwd}", app.package_info().name);

            app.emit_all("single-instance", Payload { args: argv, cwd })
                .unwrap();
        }))
        .invoke_handler(tauri::generate_handler![update_tray_icon])
        .on_window_event(|event| match event.event() {
            tauri::WindowEvent::CloseRequested { api, .. } => {
                event.window().hide().unwrap();
                api.prevent_close();
            }
            tauri::WindowEvent::Focused(is_focused) => {
                if !is_focused {
                    event.window().hide().unwrap();
                }
            }
            _ => {}
        })
        .system_tray(system_tray)
        .on_system_tray_event(|app, event| {
            tauri_plugin_positioner::on_tray_event(app, &event);
            match event {
                SystemTrayEvent::LeftClick {
                    position: _,
                    size: _,
                    ..
                } => {
                    let window = app.get_window("main").unwrap();
                    let _ = window.move_window(Position::TrayCenter);
                    if window.is_visible().unwrap() {
                        window.hide().unwrap();
                    } else {
                        window.show().unwrap();
                        window.set_focus().unwrap();
                    }
                }
                SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
                    "quit" => {
                        std::process::exit(0);
                    }
                    _ => {}
                },
                _ => {}
            }
        })
        .build(tauri::generate_context!())
        .expect("error while running tauri application")
        .run(|_app_handle, event| match event {
            tauri::RunEvent::ExitRequested { api, .. } => {
                api.prevent_exit();
            }
            _ => {}
        });
}
