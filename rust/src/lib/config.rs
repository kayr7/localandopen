use std::env::var;

pub struct Config {
    pub port: u16,
}

impl Config {
    pub fn new() -> Self {
        Self {
            port: var("PORT")
                .map(|p| p.parse().expect("Failed to parse port"))
                .unwrap_or(3030),
        }
    }
}
