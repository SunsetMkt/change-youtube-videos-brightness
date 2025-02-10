(function () {
    // panel with controls for Brightness, Contrast
    // Saturation and Hue using CSS filter property
    // https://developer.mozilla.org/en-US/docs/Web/CSS/filter
    let html =
        "<div id=open_kantcshit style=position:fixed;top:80px;right:10px;z-index:99999;display:none;opacity:.9;user-select:none><a style=font-size:2.3em>\u{1f3a8}</a></div><div id=panel_kantcshit style=position:fixed;bottom:10px;width:90%;left:50%;margin-left:-45%;z-index:9999999;font-size:1em;text-align:center;opacity:.9;user-select:none;border-radius:10px;background:#fafafa><div><div><form action=#><p><label>Brightness <span id=br_val></span>%</label><input id=br_slider max=500 min=0 type=range value=100><a id=br_reset><i>\u274c</i></a></form></div><div><form action=#><p><label>Contrast <span id=ct_val></span>%</label><input id=ct_slider max=500 min=0 type=range value=100><a id=ct_reset><i>\u274c</i></a></form></div><div><form action=#><p><label>Saturation <span id=st_val></span>%</label><input id=st_slider max=500 min=0 type=range value=100><a id=st_reset><i>\u274c</i></a></form></div><div><form action=#><p><label>Hue <span id=hue_val></span>deg</label><input id=hue_slider max=360 min=0 type=range value=0><a id=hue_reset><i>\u274c</i></a></form></div><div><p style=text-align:center><a id=close_kantcshit>Close</a></div></div></div>";

    // search for video tag inside the html
    if (document.getElementsByTagName("video").length == 0) {
        alert(
            "Oh no!, couldn't detect video in this page.\r\nIf you think this is an error open a ticket at https://github.com/gdi3d/change-youtube-videos-brightness/issues/new"
        );
        throw new Error("No video tag detected!. WTF!!??!");
    } else if (document.getElementsByTagName("video").length == 1) {
        var vp = document.getElementsByTagName("video")[0];
    } else if (document.getElementsByTagName("video").length > 1) {
        for (let ve of document.getElementsByTagName("video")) {
            if (ve.src.startsWith("blob:")) {
                var vp = ve;
                break;
            }
        }
    }

    if (vp === undefined) {
        alert(
            "Mmm, we couldn't detect where the video is at. I don't know what to do!. If you think this is an error open a ticket at https://github.com/gdi3d/change-youtube-videos-brightness/issues/new"
        );
        throw new Error("More than one video tag detected -.-");
    }

    // create kantcshit panel container
    let kantcshit_container = document.createElement("div");
    kantcshit_container.id = "container_kantcshit";
    kantcshit_container.innerHTML = html;
    document.body.appendChild(kantcshit_container);

    // prefix for the controlers
    // st_slider, hue_slider, etc...
    const controls = ["st", "hue", "ct", "br"];

    // set actions to sliders and reset buttons
    for (let c of controls) {
        let slider = document.getElementById(`${c}_slider`);
        let val = document.getElementById(`${c}_val`);
        val.innerHTML = slider.value; // Display the default slider value

        // sliders value update
        slider.oninput = function () {
            val.innerHTML = this.value;

            switch (c) {
                case "br":
                    let br_flt = vp.style.filter;
                    const br_reg = /brightness\(\d*\%\)/;
                    br_flt = br_flt.replace(br_reg, "");
                    vp.style.filter = `${br_flt} brightness(${this.value}%)`;
                    break;
                case "st":
                    let st_flt = vp.style.filter;
                    const st_reg = /saturate\(\d*\%\)/;
                    st_flt = st_flt.replace(st_reg, "");
                    vp.style.filter = `${st_flt} saturate(${this.value}%)`;
                    break;
                case "hue":
                    let hue_flt = vp.style.filter;
                    const hue_reg = /hue-rotate\(\d*deg\)/;
                    hue_flt = hue_flt.replace(hue_reg, "");
                    vp.style.filter = `${hue_flt} hue-rotate(${this.value}deg)`;
                    break;
                case "ct":
                    let ct_flt = vp.style.filter;
                    const ct_reg = /contrast\(\d*\%\)/;
                    ct_flt = ct_flt.replace(ct_reg, "");
                    vp.style.filter = `${ct_flt} contrast(${this.value}%)`;
                    break;
            }
        };

        // reset buttons
        let r_btn = document.getElementById(`${c}_reset`);
        switch (c) {
            case "br":
                r_btn.onclick = function () {
                    vp.style.filter = "brightness(100%)";
                    slider.value = 100;
                    slider.dispatchEvent(new Event("input"));
                };

                break;
            case "st":
                r_btn.onclick = function () {
                    vp.style.filter = "saturate(100%)";
                    slider.value = 100;
                    slider.dispatchEvent(new Event("input"));
                };

                break;

            case "hue":
                r_btn.onclick = function () {
                    vp.style.filter = "hue-rotate(0deg)";
                    slider.value = 0;
                    slider.dispatchEvent(new Event("input"));
                };

                break;
            case "ct":
                r_btn.onclick = function () {
                    vp.style.filter = "contrast(100%)";
                    slider.value = 100;
                    slider.dispatchEvent(new Event("input"));
                };

                break;
        }
    }

    // Close b.deo panel
    let ckantcshit = document.getElementById("close_kantcshit");
    ckantcshit.onclick = function () {
        document.getElementById("panel_kantcshit").style.display = "none";
    };

    // open b.deo panel
    let okantcshit = document.getElementById("open_kantcshit");
    okantcshit.onclick = function () {
        document.getElementById("panel_kantcshit").style.display = "block";
        okantcshit.style.display = "none";
    };

    // hover to display b.deo top right icon
    // that allows the user to open the effect panel
    vp.addEventListener("mouseenter", function () {
        if (
            document.getElementById("panel_kantcshit").style.display == "none"
        ) {
            document.getElementById("open_kantcshit").style.display = "block";
        }
    });
})();
