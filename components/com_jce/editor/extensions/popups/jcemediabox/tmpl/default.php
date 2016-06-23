<?php

/**
 * @package   	JCE
 * @copyright 	Copyright (c) 2009-2015 Ryan Demmer. All rights reserved.
 * @license   	GNU/GPL 2 or later - http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 * JCE is free software. This version may have been modified pursuant
 * to the GNU General Public License, and as distributed it includes or
 * is derivative of works licensed under the GNU General Public License or
 * other free or open source software licenses.
 */
defined('_WF_EXT') or die('RESTRICTED');

?>
    <div class="ui-form-row">
        <label for="jcemediabox_popup_title" class="ui-form-label ui-width-1-5 hastip" title="<?php echo WFText::_('WF_POPUPS_JCEMEDIABOX_OPTION_TITLE_DESC'); ?>"><?php echo WFText::_('WF_POPUPS_JCEMEDIABOX_OPTION_TITLE'); ?></label>
        <div class="ui-form-controls ui-width-4-5">
          <input id="jcemediabox_popup_title" name="jcemediabox_popup_title[]" type="text" class="text" value="" />
        </div>
    </div>

    <div class="ui-form-row">
        <label for="jcemediabox_popup_caption" class="ui-form-label ui-width-1-5 hastip" title="<?php echo WFText::_('WF_POPUPS_JCEMEDIABOX_CAPTION_DESC'); ?>"><?php echo WFText::_('WF_POPUPS_JCEMEDIABOX_CAPTION'); ?></label>
        <div class="ui-form-controls ui-width-4-5">
          <input id="jcemediabox_popup_caption" name="jcemediabox_popup_caption[]" type="text" class="text" value="" />
        </div>
    </div>

    <div class="ui-form-row">
        <label for="jcemediabox_popup_group" class="ui-form-label ui-width-1-5 hastip" title="<?php echo WFText::_('WF_POPUPS_JCEMEDIABOX_GROUP_DESC'); ?>"><?php echo WFText::_('WF_POPUPS_JCEMEDIABOX_GROUP'); ?></label>
        <div class="ui-form-controls ui-width-4-5">
          <input id="jcemediabox_popup_group" type="text" class="text" value="" />
        </div>
    </div>

    <div class="ui-form-row">
        <label for="jcemediabox_popup_icon" class="ui-form-label ui-width-1-5 hastip" title="<?php echo WFText::_('WF_POPUPS_JCEMEDIABOX_ICON_DESC'); ?>"><?php echo WFText::_('WF_POPUPS_JCEMEDIABOX_ICON'); ?></label>
        <div class="ui-form-controls ui-width-4-5 ui-grid ui-grid-small">
            <div class="ui-width-1-5">
              <select id="jcemediabox_popup_icon">
                  <option value="0"><?php echo WFText::_('WF_OPTION_NO'); ?></option>
                  <option value="1" selected="selected"><?php echo WFText::_('WF_OPTION_YES'); ?></option>
              </select>
            </div>
            <div class="ui-width-4-5">
              <label for="jcemediabox_popup_icon_position" class="ui-form-label ui-width-2-5 hastip" title="<?php echo WFText::_('WF_POPUPS_JCEMEDIABOX_ICON_POSITION_DESC'); ?>"><?php echo WFText::_('WF_POPUPS_JCEMEDIABOX_ICON_POSITION'); ?></label>
              <div class="ui-form-controls ui-width-2-5">
                <select id="jcemediabox_popup_icon_position">
                    <option value=""><?php echo WFText::_('WF_OPTION_NOT_SET'); ?></option>
                    <option value="zoom-left"><?php echo WFText::_('WF_OPTION_LEFT'); ?></option>
                    <option value="zoom-right"><?php echo WFText::_('WF_OPTION_RIGHT'); ?></option>
                    <option value="zoom-top-left"><?php echo WFText::_('WF_OPTION_TOP_LEFT'); ?></option>
                    <option value="zoom-top-right"><?php echo WFText::_('WF_OPTION_TOP_RIGHT'); ?></option>
                    <option value="zoom-bottom-left"><?php echo WFText::_('WF_OPTION_BOTTOM_LEFT'); ?></option>
                    <option value="zoom-bottom-right"><?php echo WFText::_('WF_OPTION_BOTTOM_RIGHT'); ?></option>
                </select>
              </div>
            </div>
        </div>
    </div>

    <div class="ui-form-row">
        <label class="hastip ui-form-label ui-width-1-5" title="<?php echo WFText::_('WF_LABEL_DIMENSIONS_DESC'); ?>">
            <?php echo WFText::_('WF_LABEL_DIMENSIONS'); ?>
        </label>
        <div class="ui-form-controls ui-width-4-5">
            <input type="text" id="width" value="" />
            <strong class="ui-margin-left ui-margin-right ui-vertical-align-middle">&times;</strong>
            <input type="text" id="height" />

            <input class="ui-constrain-checkbox" type="checkbox" checked />
        </div>
    </div>
    <div class="ui-form-row">
        <label for="jcemediabox_popup_autopopup" class="ui-form-label ui-width-1-5 hastip" title="<?php echo WFText::_('WF_POPUPS_JCEMEDIABOX_AUTO_DESC'); ?>"><?php echo WFText::_('WF_POPUPS_JCEMEDIABOX_AUTO'); ?></label>
        <div class="ui-form-controls ui-width-1-5">
            <select id="jcemediabox_popup_autopopup">
                <option value=""><?php echo WFText::_('WF_OPTION_NOT_SET'); ?></option>
                <option value="autopopup-single"><?php echo WFText::_('WF_POPUPS_JCEMEDIABOX_AUTO_SINGLE'); ?></option>
                <option value="autopopup-multiple"><?php echo WFText::_('WF_POPUPS_JCEMEDIABOX_AUTO_MULTIPLE'); ?></option>
            </select>
        </div>
    </div>

    <div class="ui-form-row">
        <label for="jcemediabox_popup_hide" class="ui-form-label ui-width-1-5 hastip" title="<?php echo WFText::_('WF_POPUPS_JCEMEDIABOX_HIDE_DESC'); ?>"><?php echo WFText::_('WF_POPUPS_JCEMEDIABOX_HIDE'); ?></label>
        <div class="ui-form-controls ui-width-1-10">
          <select id="jcemediabox_popup_hide">
                <option value="0"><?php echo WFText::_('WF_OPTION_NO'); ?></option>
                <option value="1"><?php echo WFText::_('WF_OPTION_YES'); ?></option>
          </select>
        </div>
    </div>
    <div class="ui-form-row">
        <label for="jcemediabox_popup_mediatype" class="ui-form-label ui-width-1-5 hastip" title="<?php echo WFText::_('WF_POPUPS_JCEMEDIABOX_MEDIATYPE_DESC'); ?>"><?php echo WFText::_('WF_POPUPS_JCEMEDIABOX_MEDIATYPE'); ?></label>
        <div class="ui-form-controls ui-width-2-5">
          <select id="jcemediabox_popup_mediatype">
                <option value=""><?php echo WFText::_('WF_OPTION_NOT_SET'); ?></option>
                <option value="text/html"><?php echo WFText::_('WF_POPUPS_JCEMEDIABOX_INTERNAL'); ?></option>
                <option value="iframe"><?php echo WFText::_('WF_POPUPS_JCEMEDIABOX_EXTERNAL'); ?></option>
                <option value="image"><?php echo WFText::_('WF_POPUPS_JCEMEDIABOX_IMAGE'); ?></option>
                <option value="video/youtube"><?php echo WFText::_('WF_POPUPS_JCEMEDIABOX_YOUTUBE'); ?></option>
                <option value="video/vimeo"><?php echo WFText::_('WF_POPUPS_JCEMEDIABOX_VIMEO'); ?></option>
                <option value="application/x-shockwave-flash"><?php echo WFText::_('WF_POPUPS_JCEMEDIABOX_FLASH'); ?></option>
                <option value="video/quicktime"><?php echo WFText::_('WF_POPUPS_JCEMEDIABOX_QUICKTIME'); ?></option>
                <option value="application/x-mplayer2"><?php echo WFText::_('WF_POPUPS_JCEMEDIABOX_WINDOWSMEDIA'); ?></option>
                <option value="video/divx"><?php echo WFText::_('WF_POPUPS_JCEMEDIABOX_DIVX'); ?></option>
                <option value="application/x-director"><?php echo WFText::_('WF_POPUPS_JCEMEDIABOX_DIRECTOR'); ?></option>
                <option value="audio/x-pn-realaudio-plugin"><?php echo WFText::_('WF_POPUPS_JCEMEDIABOX_REAL'); ?></option>
                <option value="video/mp4"><?php echo WFText::_('WF_POPUPS_JCEMEDIABOX_VIDEO_MP4'); ?></option>
                <option value="audio/mp3"><?php echo WFText::_('WF_POPUPS_JCEMEDIABOX_AUDIO_MP3'); ?></option>
                <option value="video/webm"><?php echo WFText::_('WF_POPUPS_JCEMEDIABOX_VIDEO_WEBM'); ?></option>
                <option value="audio/webm"><?php echo WFText::_('WF_POPUPS_JCEMEDIABOX_AUDIO_WEBM'); ?></option>
            </select>
        </div>
    </div>
    <div class="ui-form-row">
        <label for="jcemediabox_popup_params" class="ui-form-label ui-width-1-5 hastip" title="<?php echo WFText::_('WF_POPUPS_JCEMEDIABOX_PARAMS_DESC'); ?>"><?php echo WFText::_('WF_POPUPS_JCEMEDIABOX_PARAMS'); ?></label>
        <div class="ui-width-4-5" id="jcemediabox_popup_params">
          <div class="ui-form-row ui-repeatable">
                  <div class="ui-form-controls ui-grid ui-grid-small ui-width-9-10">
                      <label class="ui-form-label ui-width-1-10"><?php echo WFText::_('WF_LABEL_NAME'); ?></label>
                      <div class="ui-form-controls ui-width-4-10">
                        <input type="text" name="jcemediabox_popup_params_name[]" />
                      </div>
                      <label class="ui-form-label ui-width-1-10"><?php echo WFText::_('WF_LABEL_VALUE'); ?></label>
                      <div class="ui-form-controls ui-width-4-10">
                        <input type="text" name="jcemediabox_popup_params_value[]" />
                      </div>
                  </div>
                  <div class="ui-form-controls ui-width-1-10 ui-margin-small-left">
                    <button type="button" class="ui-button ui-repeatable-create"><i class="ui-icon-plus"></i></button>
                    <button type="button" class="ui-button ui-repeatable-delete"><i class="ui-icon-trash"></i></button>
                  </div>
          </div>
        </div>
    </div>
