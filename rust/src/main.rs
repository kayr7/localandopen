mod lib;
use lib::config::Config;
use serde::{Deserialize, Serialize};
use warp::{reply::html, Filter};

#[derive(Deserialize, Serialize)]
struct SearchQuery {
    q: String,
}

#[derive(Serialize, Deserialize)]
struct SearchResult {
    name: String,
}

#[derive(Serialize, Deserialize)]
struct SearchResults {
    query: SearchQuery,
    results: Vec<SearchResult>,
}

#[derive(Debug)]
struct WithTemplate<T: Serialize> {
    name: &'static str,
    vars: T,
}

fn render<T: Serialize>(
    tpl: WithTemplate<T>,
    hb: std::sync::Arc<handlebars::Handlebars>,
) -> impl warp::Reply {
    html(
        hb.render(tpl.name, &tpl.vars)
            .unwrap_or_else(|err| err.to_string()),
    )
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    dotenv::dotenv().ok();

    let config = Config::new();

    let mut hb = handlebars::Handlebars::new();
    hb.register_template_string("index", include_str!("templates/index.html"))?;
    hb.register_template_string(
        "search_results",
        include_str!("templates/search_results.html"),
    )?;
    hb.register_template_string("newvendor", include_str!("templates/newvendor.html"))?;

    hb.register_partial("result", include_str!("templates/_result.html"))?;
    hb.register_partial("search_form", include_str!("templates/_search_form.html"))?;

    let hb = std::sync::Arc::new(hb);

    let hb1 = hb.clone();
    let index = warp::get()
        .and(warp::path::end())
        .map(|| {
            let vars = SearchQuery { q: "".to_owned() };

            WithTemplate {
                name: "index",
                vars,
            }
        })
        .map(move |tpl| render(tpl, hb1.clone()));


    let hb2 = hb.clone();
    let search = warp::get()
        .and(warp::query())
        .map(move |query: SearchQuery| {
            let vars = SearchResults {
                query,
                results: vec![
                    SearchResult {
                        name: "Acme Inc".to_owned(),
                    },
                    SearchResult {
                        name: "Foo Industries".to_owned(),
                    },
                ],
            };

            WithTemplate {
                name: "search_results",
                vars,
            }
        })
        .map(move |tpl| render(tpl, hb2.clone()));

    let hb3 = hb.clone();
    let newvendor = warp::get()
        .and(warp::path("newvendor")).map(|| {
            let vars = SearchQuery { q: "".to_owned() };
            WithTemplate{
                name: "newvendor",
                vars,
            }
        }).map(move |tpl| render(tpl, hb3.clone()));


    let app = search.or(index).or(newvendor);

    warp::serve(app).run(([0, 0, 0, 0], config.port)).await;

    Ok(())
}
