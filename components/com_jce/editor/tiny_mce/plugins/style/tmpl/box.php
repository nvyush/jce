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

defined('_JEXEC') or die('RESTRICTED');
?>

    <div class="ui-form-row ui-grid ui-grid-small">
      <label for="box_width" class="ui-form-label ui-width-2-10"><?php echo WFText::_('WF_STYLES_BOX_WIDTH');?></label>

            <div class="ui-form-controls ui-width-2-10">
              <input type="number" id="box_width" onchange="StyleDialog.synch('box_width','positioning_width');" />
            </div>
            <div class="ui-form-controls ui-width-2-10">
              <select id="box_width_measurement"></select>
            </div>

      <label for="box_float" class="ui-form-label ui-width-2-10"><?php echo WFText::_('WF_STYLES_BOX_FLOAT');?></label>
      <div class="ui-form-controls ui-width-2-10">
        <select id="box_float" class="mceEditableSelect"></select>
      </div>
    </div>

    <div class="ui-form-row ui-grid ui-grid-small">
      <label for="box_height" class="ui-form-label ui-width-2-10"><?php echo WFText::_('WF_STYLES_BOX_HEIGHT');?></label>

        <div class="ui-form-controls ui-width-2-10">
          <input type="number" id="box_height" class="mceEditableSelect" onchange="StyleDialog.synch('box_height','positioning_height');" />
        </div>
        <div class="ui-form-controls ui-width-2-10">
          <select id="box_height_measurement"></select>
        </div>

      <label for="box_clear" class="ui-form-label ui-width-2-10"><?php echo WFText::_('WF_STYLES_BOX_CLEAR');?></label>
      <div class="ui-form-controls ui-width-2-10">
        <select id="box_clear" class="mceEditableSelect"></select>
      </div>
    </div>

    <div class="ui-grid ui-grid-small">
  <div class="ui-width-5-10">
    <fieldset>
      <legend><?php echo WFText::_('WF_STYLES_PADDING');?></legend>
        <div class="ui-form-row">
          <input type="checkbox" id="box_padding_same" checked="checked" onclick="StyleDialog.toggleSame(this,'box_padding');" />
          <label for="box_padding_same"><?php echo WFText::_('WF_STYLES_SAME');?></label>
        </div>
        <div class="ui-form-row ui-grid ui-grid-small">
          <label for="box_padding_top" class="ui-form-label ui-width-2-10"><?php echo WFText::_('WF_STYLES_TOP');?></label>
              <div class="ui-form-controls ui-width-4-10">
                <input type="number" id="box_padding_top" />
              </div>
              <div class="ui-form-controls ui-width-4-10">
                <select id="box_padding_top_measurement"></select>
              </div>
        </div>
        <div class="ui-form-row ui-grid ui-grid-small">
          <label for="box_padding_right" class="ui-form-label ui-width-2-10"><?php echo WFText::_('WF_STYLES_RIGHT');?></label>
              <div class="ui-form-controls ui-width-4-10">
                <input type="number" id="box_padding_right" disabled="disabled" />
              </div>
              <div class="ui-form-controls ui-width-4-10">
                <select id="box_padding_right_measurement" disabled="disabled"></select>
              </div>
        </div>
        <div class="ui-form-row ui-grid ui-grid-small">
          <label for="box_padding_bottom" class="ui-form-label ui-width-2-10"><?php echo WFText::_('WF_STYLES_BOTTOM');?></label>
              <div class="ui-form-controls ui-width-4-10">
                <input type="number" id="box_padding_bottom" disabled="disabled" />
              </div>
              <div class="ui-form-controls ui-width-4-10">
                <select id="box_padding_bottom_measurement" disabled="disabled"></select>
              </div>
        </div>
        <div class="ui-form-row ui-grid ui-grid-small">
          <label for="box_padding_left" class="ui-form-label ui-width-2-10"><?php echo WFText::_('WF_STYLES_LEFT');?></label>
              <div class="ui-form-controls ui-width-4-10">
                <input type="number" id="box_padding_left" disabled="disabled" />
              </div>
              <div class="ui-form-controls ui-width-4-10">
                <select id="box_padding_left_measurement" disabled="disabled"></select>
              </div>
        </div>

    </fieldset>
   </div>
   <div class="ui-width-5-10">
    <fieldset>
      <legend><?php echo WFText::_('WF_STYLES_MARGIN');?></legend>
        <div class="ui-form-row">
          <input type="checkbox" id="box_margin_same" checked="checked" onclick="StyleDialog.toggleSame(this,'box_margin');" />
          <label for="box_margin_same"><?php echo WFText::_('WF_STYLES_SAME');?></label>
        </div>
        <div class="ui-form-row ui-grid ui-grid-small">
          <label for="box_margin_top" class="ui-form-label ui-width-2-10"><?php echo WFText::_('WF_STYLES_TOP');?></label>
              <div class="ui-form-controls ui-width-4-10">
                <input type="number" id="box_margin_top" />
              </div>
              <div class="ui-form-controls ui-width-4-10">
                <select id="box_margin_top_measurement" ></select>
              </div>
        </div>
        <div class="ui-form-row ui-grid ui-grid-small">
          <label for="box_margin_right" class="ui-form-label ui-width-2-10"><?php echo WFText::_('WF_STYLES_RIGHT');?></label>
              <div class="ui-form-controls ui-width-4-10">
                <input type="number" id="box_margin_right" disabled="disabled" />
              </div>
              <div class="ui-form-controls ui-width-4-10">
                <select id="box_margin_right_measurement" disabled="disabled"></select>
              </div>
        </div>
        <div class="ui-form-row ui-grid ui-grid-small">
          <label for="box_margin_bottom" class="ui-form-label ui-width-2-10"><?php echo WFText::_('WF_STYLES_BOTTOM');?></label>
              <div class="ui-form-controls ui-width-4-10">
                <input type="number" id="box_margin_bottom" disabled="disabled" />
                </div>
              <div class="ui-form-controls ui-width-4-10">
                <select id="box_margin_bottom_measurement" disabled="disabled"></select>
              </div>
        </div>
        <div class="ui-form-row ui-grid ui-grid-small">
          <label for="box_margin_left" class="ui-form-label ui-width-2-10"><?php echo WFText::_('WF_STYLES_LEFT');?></label>
              <div class="ui-form-controls ui-width-4-10">
                <input type="number" id="box_margin_left" disabled="disabled" />
              </div>
              <div class="ui-form-controls ui-width-4-10">
                <select id="box_margin_left_measurement" disabled="disabled"></select>
              </div>
        </div>
    </fieldset>
  </div>
</div>
