(function () {
  if (window.createSmlPopover) {
    return;
  }

  window.createSmlPopover = function(settings) {
    const parent = document.createElement("div");
    parent.className = "davrantLightboxParent";
    parent.style.display = "none";

    function hideParent() {
        parent.style.display = "none";
    }
    parent.addEventListener("click", function (e) {
        if (e.target === parent) {
            hideParent();
        }
    });

    const lightbox = document.createElement("div");
    lightbox.className = "davrantLightbox";
    if (settings.idealWidth) {
        lightbox.style.width = settings.idealWidth + "px";
    }

    const closeButton = document.createElement("span");
    closeButton.className = "davrantLightboxClose";
    closeButton.addEventListener("click", hideParent);
    lightbox.appendChild(closeButton);

    parent.appendChild(lightbox);
    document.body.appendChild(parent);

    const lightboxContents = document.getElementById(settings.anchorName);
    lightbox.appendChild(lightboxContents);
    lightboxContents.className = lightboxContents.className.replace("lightboxContent", "");
    
    const contentBackground = getComputedStyle(lightboxContents).background;
    if (!settings.doNotCopyBackground && contentBackground) {
      lightbox.style.background = contentBackground;
    }

    if (settings.mode.toLowerCase() === "timer") {
        setTimeout(function() {
            parent.style.display = "unset";
        }, settings.timeToShow);
    } else if (settings.mode.toLowerCase() === "page-leave") {
        document.addEventListener("mouseleave", function (e) {
            if (!this.hasShown) {
                if (settings.showOnlyOnTopExit && !(e.clientY > 0)) {
                    this.hasShown = true;
                    parent.style.display = "unset";
                } else if (!settings.showOnlyOnTopExit) {
                    this.hasShown = true;
                    parent.style.display = "unset";
                }
            }
        });
    }
  };
}());
